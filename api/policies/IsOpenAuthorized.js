const OpenSecret = sails.config.session.secret;

module.exports = (req, res, next) => {
    let secret;
    //Authenticate the secret authorization key for open apis.
    if (req.headers && req.headers.authorization) {
        secret = req.headers.authorization;
    } else {
        return ResponseService.json(res, ConstantService.responseCode.UNAUTHORIZED, ConstantService.responseMessage.ERR_MSG_RESTRICTED);
    }

    if (secret !== OpenSecret) {
        return ResponseService.json(res, ConstantService.responseCode.UNAUTHORIZED, ConstantService.responseMessage.ERR_MSG_RESTRICTED);
    } else {
        next();
    }

};
