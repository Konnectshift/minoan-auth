const Joi = require("joi");
const Moment = require('moment');

module.exports = {
    
    /**
     * Add a new staff.
     * API Endpoint :   /staff/add
     * API Method   :   POST
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    addStaff: async (req, res) => {
        try {

            await sails.getDatastore()
                .transaction(async (dbConnection) => {
                    sails.log.info("====================== ADD : STAFF REQUEST ==============================\n");
                    sails.log.info("REQ BODY :", req.body);

                    let staffRequest = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        contactNumber: req.body.contactNumber,
                        roleId: req.body.roleId | 0,
                        status: req.body.status
                    };


                    const schema = Joi.object().keys({
                        name: Joi.string().required(),
                        email: Joi.string().required(),
                        password: Joi.string().required(),
                        contactNumber: Joi.string().required(),
                        roleId: Joi.number().required(),
                        status: Joi.boolean().required(),
                    });

                    const validateResult = schema.validate(staffRequest);

                    if (validateResult.error) {
                        return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                            message: validateResult.error.message,
                        });
                    }

                    const isEmailAlreadyRegistered = await Staff.count({
                        email: staffRequest.email,
                        deletedAt: null
                    }).usingConnection(dbConnection);

                    if (isEmailAlreadyRegistered > 0) {
                        return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                            message: ConstantService.responseMessage.STAFF_EMAIL_ALREADY_REGISTERED,
                        });
                    }

                    const isPhoneAlreadyRegistered = await Staff.count({
                        contactNumber: staffRequest.contactNumber,
                        deletedAt: null
                    }).usingConnection(dbConnection);

                    if (isPhoneAlreadyRegistered > 0) {
                        return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                            message: ConstantService.responseMessage.STAFF_CONTACT_NUMBER_ALREADY_REGISTERED,
                        });
                    }

                    const hashPassword = await BCryptService.encryptedPassword(staffRequest.password);

                   await Staff.create({
                        name: staffRequest.name,
                        email: staffRequest.email,
                        contactNumber: staffRequest.contactNumber,
                        password: hashPassword,
                        roleId: staffRequest.roleId,
                        status: staffRequest.status
                    }).usingConnection(dbConnection);

                    return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                        message: ConstantService.responseMessage.STAFF_ADDED_SUCCESS
                    });
                });
        } catch (exception) {

            LogService.error(exception);
            return ResponseService.json(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_ADD_STAFF_API);
        }
    },

    /**
     * Edit existing staff in db.
     * API Endpoint :   /staff/edit
     * API Method   :   PUT
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    editStaff: async (req, res) => {
        try {
            sails.log.info("====================== EDIT : STAFF REQUEST ==============================\n");
            sails.log.info("REQ BODY :", req.body);

            let staffRequest = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                roleId: req.body.roleId,
                status: req.body.status
            };


            const schema = Joi.object().keys({
                id: Joi.number().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
                contactNumber: Joi.string().required(),
                roleId: Joi.number().required(),
                status: Joi.boolean().required(),
            });

            const validateResult = schema.validate(staffRequest);

            if (validateResult.error) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: validateResult.error.message,
                });
            }

            const staffExist = await Staff.count({id: staffRequest.id, deletedAt: null});

            if (!staffExist) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.STAFF_NOT_FOUND
                });
            }

            const isEmailAlreadyRegistered = await Staff.count({
                id: {'!=' : staffRequest.id},
                email: staffRequest.email,
                deletedAt: null
            });

            if (isEmailAlreadyRegistered > 0) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.STAFF_EMAIL_ALREADY_REGISTERED,
                });
            }

            const isPhoneAlreadyRegistered = await Staff.count({
                id: {'!=' : staffRequest.id},
                contactNumber: staffRequest.contactNumber,
                deletedAt: null
            });

            if (isPhoneAlreadyRegistered > 0) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.STAFF_CONTACT_NUMBER_ALREADY_REGISTERED,
                });
            }

            await Staff.update({id: staffRequest.id}, {
                name: staffRequest.name,
                email: staffRequest.email,
                contactNumber: staffRequest.contactNumber,
                roleId: staffRequest.roleId,
                status: staffRequest.status,
            });

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.STAFF_EDIT_SUCCESS
            });

        } catch (exception) {

            LogService.error(exception);
            return ResponseService.json(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_EDIT_STAFF_API);
        }
    },

    /**
     * Delete the specific staff from system.
     * API Endpoint :   /staff/delete
     * API Method   :   DELETE
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    deleteStaff: async (req, res) => {
        try {
            sails.log.info("====================== DELETE : STAFF REQUEST ==============================\n");
            sails.log.info("REQ BODY :", req.query);
            const builderId = req.sessionData.builderId;

            const id = req.query.id | 0;

            if (!id) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.NO_STAFF_ID_FOUND,
                });
            }

            const currentDateTime = Moment.utc().format(ConstantService.standardDateTime);

            const staffExist = await Staff.count({id: id, builderId: builderId, deletedAt: null});

            if (!staffExist) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.STAFF_NOT_FOUND
                });
            }

            await Staff.update({id: id, builderId: builderId}, {status: false, deletedAt: currentDateTime});

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.STAFF_DELETE_SUCCESS
            });


        } catch (exception) {

            LogService.error(exception);
            return ResponseService.json(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_DELETE_STAFF_API);
        }
    },

    /**
     * Reset password of Staff member.
     * API Endpoint :   /city/resetPassword
     * API Method   :   PUT
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    resetStaffPassword: async (req, res) => {
        try {
            sails.log.info("====================== RESET PASSWORD : STAFF REQUEST ==============================\n");
            sails.log.info("REQ BODY :", req.body);

            const id = req.body.id;
            const password = req.body.password;

            if (!id) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.NO_STAFF_ID_FOUND,
                });
            }

            if (!password) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.ENTER_VALID_PASSWORD,
                });
            }

            const staffExist = await Staff.count({id: id, deletedAt: null});

            if (!staffExist) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: ConstantService.responseMessage.STAFF_NOT_FOUND
                });
            }
            const hashPassword = await BCryptService.encryptedPassword(password);

            await Staff.update({id: id}, {password: hashPassword});

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.PASSWORD_CHANGE_SUCCESS
            });

        } catch (exception) {

            LogService.error(exception);
            return ResponseService.json(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_RESET_PASSWORD_STAFF_API);
        }
    },

    /**
     * List of staff.
     * API Endpoint :   /staff/list
     * API Method   :   POST
     *
     * @param   {Object}        req          Request Object From API Request.
     * @param   {Object}        res          Response Object For API Request.
     * @returns {Promise<*>}    JSONResponse With success code 200 and  information or relevant error code with message.
     */

    staffList: async (req, res) => {
        try {
            sails.log.info("====================== LIST STAFF : STAFF REQUEST ==============================\n");

            const request = {
                order: req.body.order,
                skip: req.body.skip,
                limit: req.body.limit,
                status: req.body.status,
            };

            const schema = Joi.object().keys({
                order: Joi.array().items(Joi.object().keys({
                    columnName: Joi.string().required(),
                    direction: Joi.boolean().required(),
                })),
                skip: Joi.number(),
                limit: Joi.number(),
                status: Joi.boolean(),
            });

            const validateResult = schema.validate(request);

            if (validateResult.error) {
                return ResponseService.jsonResponse(res, ConstantService.responseCode.BAD_REQUEST, {
                    message: validateResult.error.message,
                });
            }

            const where = {deletedAt: null};
            const sort = [];

            //Sort by order
            if (!_.isEmpty(request.order)) {
                for (const column of request.order) {
                    const object = {};
                    object[column.columnName] = column.direction ? 'ASC' : 'DESC';
                    sort.push(object);
                }
            } else {
                sort.push({id: 'DESC'});
            }

            //Filter by status
            if (request.status || request.status === false) {
                where.status = request.status;
            }

            const criteria = {
                select: ['id', 'name', 'contactNumber', 'email', 'roleId', 'status'],
                where: where,
                sort: sort
            };

            if ((request.skip || request.skip === 0) && request.limit) {
                criteria.limit = request.limit;
                criteria.skip = request.skip;
            }


            let staffList = await Staff.find(criteria);

            const totalCount = await Staff.count(where);

            return ResponseService.jsonResponse(res, ConstantService.responseCode.SUCCESS, {
                message: ConstantService.responseMessage.STAFF_LIST,
                data: {
                    count: totalCount,
                    staffList: staffList
                }
            });

        } catch (exception) {

            LogService.error(exception);
            return ResponseService.json(res, ConstantService.responseCode.INTERNAL_SERVER_ERROR, ConstantService.responseMessage.ERR_MSG_ISSUE_IN_STAFF_LIST_API);
        }
    },

};
