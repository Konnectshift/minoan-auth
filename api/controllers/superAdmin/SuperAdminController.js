const Joi = require('joi');

module.exports = {

    /**
     * Admin Login
     * API Endpoint :   /public/super/admin/login
     * API Method   :   POST
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    adminLogin: async (req, res) => {
        try {
            sails.log.info("====================== ADMIN LOGIN : SUPER ADMIN REQUEST ==============================\n");
            sails.log.info("REQ BODY :", req.body);

            const adminRequest = {
                email: req.body.email,
                password: req.body.password
            };

            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required()
            });

            const validateResult = schema.validate(adminRequest);

            if (validateResult.error) {
                sails.log.info(validateResult.error);
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    error: validateResult.error.message,
                });
            }

            let adminDetails = await SuperAdmin.find({
                select: ['id', 'email', 'password'],
                where: {email: adminRequest.email, isEnabled: true},
                limit: 1,
            });

            if (_.isEmpty(adminDetails)) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.ERR_MSG_WRONG_CREDENTIALS_API,
                    data: {}
                });
            }

            adminDetails = adminDetails[0];

            const isSamePassword = await BCryptService.isSamePassword(adminRequest.password, adminDetails.password);

            if (!isSamePassword) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.WRONG_PASSWORD,
                });
            }


            const accessId = ConstantService.prefixAccessId.SUPER_ADMIN + (adminDetails.id + "").padStart(6, '0');
            const jwtToken = await JwtService.issueNewAccessToken(adminDetails.id, accessId, ConstantService.userType.SUPER_ADMIN);

            adminDetails = _.omit(adminDetails, ['password']);

            const response = {
                accessToken: jwtToken.accessToken,
                user: adminDetails,
            };

            sails.log.info("RESPONSE :", response);

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.LOG_IN_SUCCESS,
                data: response
            });


        } catch (exception) {

            LogService.error(exception);
            return ResponseService.json(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_SUPER_ADMIN_LOGIN_API);
        }

    },

    /**
     * Update super admin password.
     * API Endpoint :   /public/super/admin/update
     * API Method   :   POST
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    updatePassword: async (req, res) => {
        try {
            sails.log.info("====================== ADMIN PASSWORD UPDATE : SUPER ADMIN REQUEST ==============================\n");

            const adminRequest = {
                email: req.body.email,
                password: req.body.password,
            };

            const schema = Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required(),
            });

            const validateResult = schema.validate(adminRequest);

            if (validateResult.error) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    error: validateResult.error.message,
                });
            }

            adminRequest.password = await BCryptService.encryptedPassword(adminRequest.password);

            await SuperAdmin.update({email: adminRequest.email}, {password: adminRequest.password});

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.SUCCESS_MSG,
            });

        } catch (exception) {
            sails.log.error(exception);
            return ResponseService.jsonResponse(res, ConstantService.responseCode.ERR_SOMETHING_WENT_WRONG, {
                message: ConstantService.responseMessage.FAILURE_MSG,
            });
        }
    },

    /**
     * Admin Logout
     * API Endpoint :   /public/super/admin/logout
     * API Method   :   POST
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    logoutAdmin: async (req, res) => {

        try {
            sails.log.info("====================== LOGOUT : SUPER ADMIN REQUEST ==============================\n");

            const accessId = req.sessionData.accessId;

            RedisService.removeData(accessId);

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.LOG_OUT_SUCCESS
            });
        } catch (exception) {

            LogService.error(exception);
            return ResponseService.json(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_SUPER_ADMIN_LOGOUT_API);
        }

    },
};
