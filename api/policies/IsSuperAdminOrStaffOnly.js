module.exports = (req, res, next) => {

    //Policy check for super admin and staff only.
    if (req.sessionData &&
        (req.sessionData.role === ConstantService.userType.SUPER_ADMIN ||
            req.sessionData.role === ConstantService.userType.STAFF)) {
        next();
    } else {
        return ResponseService.json(res, ConstantService.responseCode.UNAUTHORIZED, ConstantService.responseMessage.ERR_MSG_ONLY_SUPER_ADMIN_OR_STAFF_AUTHORIZED_API);
    }
};
