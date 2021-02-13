/*
* ConstantService js to store all constant values for this app
 */
module.exports = {
    pageLimit: '10',
    standardDateTime: 'YYYY-MM-DD HH:mm:ss',
    userDateTime: 'll',
    onlyDate: 'YYYY-MM-DD',
    onlyTime: 'HH:mm',
    standardTime: 'HH:mm:ss',
    defaultLocale: 'en-US',
    currentDir: process.cwd(),
    responseCode: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        INTERNAL_SERVER_ERROR: 500
    },
    staffRole: {
        SUPER_ADMIN: 0
    },
    userType: {
        SUPER_ADMIN: 0,
        STAFF: 1,
    },
    userTypeTableName: {
        0: 'super_admin',
        1: 'staff'
    },
    prefixAccessId: {
        SUPER_ADMIN: 'SA',
        STAFF: 'SS',
    },
    pushSource: {
        ANDROID: 'ANDROID',
        IOS: 'IOS',
        WEB: 'WEB'
    },
    responseMessage: {

        //IsAuthorized
        ERR_MSG_WRONG_FORMAT_AUTHORIZATION: "Format is Authorization: Bearer [token]",
        ERR_MSG_NO_HEADER_AUTHORIZATION: "Please login to access this feature!",
        ERR_MSG_RESTRICTED: "This api is restricted! Please contact support.",
        ERR_MSG_INVALID_SESSION: "Session expired! Please login again!",

        //Authorization
        ERR_MSG_ONLY_ADMIN_OR_STAFF_AUTHORIZED_API: "Sorry! Only admin and staff are allowed to access these api",
        ERR_MSG_ONLY_SUPER_ADMIN_OR_STAFF_AUTHORIZED_API: "Sorry! Only super admin and staff are allowed to access these api",
        ERR_MSG_ONLY_ACCESS_TOKEN_ALLOWED_AUTHORIZED_API: "Refresh token is not allowed for authorization!",

        //Super admin Controller
        ERR_MSG_ISSUE_IN_SUPER_ADMIN_LOGIN_API: "Oops! Something went wrong in super admin login api!",
        ERR_MSG_ISSUE_IN_SUPER_ADMIN_LOGOUT_API: "Oops! Something went wrong in super admin logout api!",

        //Admin Session controller
        ERR_MSG_ISSUE_IN_ADMIN_LOGIN_API: "Oops! Something went wrong in admin login api!",
        ERR_MSG_ISSUE_IN_ADMIN_ACCESS_TOKEN_LOGIN_API: "Oops! Something went wrong in admin access token login api!",
        ERR_MSG_ISSUE_IN_ADMIN_LOGOUT_API: "Oops! Something went wrong in admin logout api!",

        //Staff Controller - errors
        ERR_MSG_ISSUE_IN_ADD_STAFF_API: "Oops! Something went wrong in add staff api!",
        ERR_MSG_ISSUE_IN_EDIT_STAFF_API: "Oops! Something went wrong in edit staff api!",
        ERR_MSG_ISSUE_IN_DELETE_STAFF_API: "Oops! Something went wrong in delete staff api!",
        ERR_MSG_ISSUE_IN_RESET_PASSWORD_STAFF_API: "Oops! Something went wrong in reset password staff api!",
        ERR_MSG_ISSUE_IN_STAFF_LIST_API: "Oops! Something went wrong in staff list api!",

        /* ====================================== */

        //Global
        SUCCESS_MSG: "success",
        FAILURE_MSG: "failure",
        NO_UTC_OFFSET_FOUND: "No utc offset added! UTC is required",
        START_END_WRONG_TIME: "Start time must be before end time",
        FROM_DATE_TO_END_DATE: "From date must be before to date",
        NO_FUTURE_TIME: "Future time cannot be edited",
        NO_PAST_TIME: "Scheduled Time must be after current time",
        EMAIL_OR_CONTACT_EMPTY: "AT least one should be added between Email/Contact Number",
        ERR_SOMETHING_WENT_WRONG: "Something wrong, please try again!",
        ERR_OOPS_SOMETHING_WENT_WRONG: "Oops! Something wrong",
        ERR_SOMETHING_WENT_WRONG_LARGE_SIZE: "Something wrong, please try again! (Note : Max image size is 10MB)",
        NO_FILE_UPLOADED: "Something wrong, Is file uploaded? please try again! (Note : Max file size is 10MB)",
        FILE_NOT_CSV: "Something wrong, Is file CSV and in specified format (RF4180)? please try again! (Note : Max file size is 10MB)",
        UNAUTHORIZED_USER: "Unauthorized user",
        NO_FILE_FOUND: "No file found",
        ERR_MSG_WRONG_CREDENTIALS_API: "Email or password is wrong.",
        ERR_MSG_WRONG_CREDENTIALS_USER_API: "Contact number or password is wrong.",
        ERR_MSG_WRONG_PASSWORD_API: "Password is wrong.",

        //App Controller
        VERSION_CHECK_DETAILS: "Version check detail",
        EMPTY_LIST: "List is empty",
        LOG_IN_SUCCESS: "Logged in successfully!",
        USER_PROFILE: "User profile information",
        LOG_IN_FAIL: "Logged in failed!",
        LOG_OUT_SUCCESS: "You are logged out!",
        REGISTER_SUCCESS: "Registered successfully.",
        EMAIL_ALREADY_EXIST: "Entered email already exists.",
        INVALID_EMAIL: "Enter valid email only",
        PROFILE_UPDATED: "Profile updated",
        RESEND_EMAIL_SENT: "An email with reset password OTP sent to the user",
        PASSWORD_UPDATED_SUCCESS: "Password Updated successfully",
        RESET_PASSWORD_OTP_INVALID: "Reset password OTP is not invalid",
        NO_RESET_KEY_FOUND: "No reset key found!",
        PASSWORD_RESET_KEY_NOT_VALID: "The password reset link is no longer valid. Please request another password reset email from the login page.",
        URL_EXPIRED: "The account verification link is no longer valid. Please request another account verification email from the login page.",
        NO_ACCOUNT_FOUND: "No account found!Is the account deleted or inactive?!",
        PASSWORD_RECOVERY: "Password recovery",
        NO_ACTIVE_EMAIL_ACCOUNT: "No user account registered with this email",
        NO_ACTIVE_CONTACT_NUMBER_ACCOUNT: "No user account registered with this number",
        WRONG_PASSWORD: "Password is wrong.",
        NO_USER_FOUND: "No user found for this session. Is the user active?",

        //Staff Controller - general
        STAFF_ADDED_SUCCESS: "Staff has been added successfully.",
        STAFF_EDIT_SUCCESS: "Staff has been updated successfully.",
        STAFF_DELETE_SUCCESS: "Staff has been deleted successfully.",
        ENTER_VALID_PASSWORD: "Enter valid password",
        PASSWORD_CHANGE_SUCCESS: "Password has been changed successfully.",
        STAFF_EMAIL_ALREADY_REGISTERED: "Staff's email already registered!",
        STAFF_NOT_FOUND: "No staff found with this id! Is the staff deleted?",
        NO_STAFF_ID_FOUND: "No staff id found!",
        STAFF_LIST: "Staff list",
        STAFF_CONTACT_NUMBER_ALREADY_REGISTERED: "Staff contact number already registered!",

     },
};
