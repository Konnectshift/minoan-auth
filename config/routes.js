/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'GET /': {controller: 'apps/AppsController', action: 'ping'},

    /* ======================== Super admin Controller ===================================================== */
    //Super Admin Login
    'POST /public/super/admin/login': {controller: 'superAdmin/SuperAdminController', action: 'adminLogin'},
    //Super Admin password update
    'POST /public/super/admin/update': {controller: 'superAdmin/SuperAdminController', action: 'updatePassword'},
    //Super Admin Logout
    'POST /public/super/admin/logout': {controller: 'superAdmin/SuperAdminController', action: 'logoutAdmin'},

    /* ======================== Admin Session Controller ===================================================== */
    //Admin Login
    'POST /public/admin/login': {controller: 'admin/AdminSessionController', action: 'adminLogin'},
    //Admin access token login
    'POST /admin/accessTokenLogin': {controller: 'admin/AdminSessionController', action: 'adminAccessTokenLogin'},
    //Admin logout
    'POST /admin/logout': {controller: 'admin/AdminSessionController', action: 'logoutAdmin'},

    /* ======================== Staff Controller ===================================================== */
    //Add Staff
    'POST /staff/add': {controller: 'staff/StaffManagementController', action: 'addStaff'},
    //Edit Staff
    'PUT /staff/edit': {controller: 'staff/StaffManagementController', action: 'editStaff'},
    //Delete Staff
    'DELETE /staff/delete': {controller: 'staff/StaffManagementController', action: 'deleteStaff'},
    //Reset Password Staff
    'PUT /staff/resetPassword': {controller: 'staff/StaffManagementController', action: 'resetStaffPassword'},
    //List Staff
    'POST /staff/list': {controller: 'staff/StaffManagementController', action: 'staffList'},


};
