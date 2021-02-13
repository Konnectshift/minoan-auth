const Jwt = require('jsonwebtoken');
const JwtSecret = sails.config.session.secret;

module.exports = {

    /**
     * Issue new access token ( and refresh token if not attendant).
     *
     * @param id - Id of user
     * @param accessId - Access Id of user
     * @param role - Type of user
     * @param source - Source of origin for token
     * @param deviceToken - Device token of notification
     * @returns {Promise<void>}
     */

    issueNewAccessToken: async (id, accessId, role, source = '', deviceToken = '') => {
        let payload = {
            id: id,
            accessId: accessId,
            role: role,
            pushData: {}
        };
        // let accessTokenExpiresIn = sails.config.custom.accessTokenExpiryTime;

        let jwtResponse = {};
        jwtResponse.accessToken = Jwt.sign(payload, JwtSecret);

        payload.token = jwtResponse.accessToken;

        payload = _.omit(payload, ['type']);

        try {
            const data = await RedisService.getData(accessId);
            const newPushData = {};
            if (!_.isEmpty(payload.pushData)) {
                const pushList = _.keys(data.pushData);
                for (const push of pushList) {
                    await Jwt.verify(push, JwtSecret, async (err, decoded) => {
                        if (!err) {
                            newPushData[push] = payload.pushData[push];
                        } else {
                        }
                    });
                }
            }
            if (!_.isEmpty(source) && !_.isEmpty(deviceToken)) {
                newPushData[payload.token] = {source: source, deviceToken: deviceToken};
            }
            payload.pushData = newPushData;

            sails.log.info(newPushData);
        } catch (e) {
            payload.pushData = {};
            if (!_.isEmpty(source) && !_.isEmpty(deviceToken)) {
                payload.pushData[payload.token] = {source: source, deviceToken: deviceToken};
            }
        }

        RedisService.setData(payload.accessId, payload);
        return jwtResponse;
    },

    /**
     * Verify token.
     *
     * @param token - JWT Token to be verified
     * @param callback - With payload if success else error object
     */

    verify: (token, callback) => {
        Jwt.verify(token, JwtSecret, (err, decoded) => {
            if (err) return callback(err);
            RedisService.getData(decoded.accessId).then((payload) => {
                    return callback(null, payload);
                })
                .catch(() => {
                    return callback(true);
                });

        });
    },

};
