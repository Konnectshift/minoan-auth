/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions, unless overridden.       *
     * (`true` allows public access)                                            *
     *                                                                          *
     ***************************************************************************/


    '*': ['IsAuthorized'],

    /* ======================= Apps Controller ================================================= */

    'apps/AppsController': {
        '*': true,
    },

    /* ======================= Super Admin Controller ================================================= */

    'superAdmin/SuperAdminController': {
        'adminLogin': true,
        'updatePassword': true,
    },

    /* ======================= Admin session controller ================================================= */

    'admin/AdminSessionController': {
        '*': ['IsAuthorized'],
        'adminLogin': true
    },

    /* ======================= Staff Controller ================================================= */

    'staff/StaffManagementController': {
        '*': ['IsAuthorized'],
    },

};
