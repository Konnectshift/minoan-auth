module.exports =  (req, res, next) => {
    let token;

    //Authenticate the token and check if token is valid.
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            const scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return ResponseService.json(res, ConstantService.responseCode.UNAUTHORIZED, ConstantService.responseMessage.ERR_MSG_WRONG_FORMAT_AUTHORIZATION);
        }
    } else if (req.param('accessToken')) {
        token = req.param('accessToken');
    } else {
        return ResponseService.json(res, ConstantService.responseCode.UNAUTHORIZED, ConstantService.responseMessage.ERR_MSG_NO_HEADER_AUTHORIZATION);
    }

    // sails.sockets.broadcast(ConstantService.socket.ROOM, ConstantService.socket.EVENT_NAME, {path : req.path});

    JwtService.verify(token,  (err, payload) => {
        sails.log.verbose("JWT VERIFICATION : ERROR, PAYLOAD :", err, payload);
        if (err) return ResponseService.json(res, ConstantService.responseCode.UNAUTHORIZED, ConstantService.responseMessage.ERR_MSG_INVALID_SESSION);
        req.accessToken = token;
        req.sessionData = payload;
        next();
    });

};
