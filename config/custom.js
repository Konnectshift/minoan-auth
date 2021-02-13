/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

    /***************************************************************************
     *                                                                          *
     * Any other custom config this Sails app should use during development.    *
     *                                                                          *
     ***************************************************************************/
    accessTokenExpiryTime: 3600 * 72, //72 hours
    redisPort: process.env.REDIS_PORT | 0,
    redisHost: process.env.REDIS_HOST,
    redisDB: 0,

};
