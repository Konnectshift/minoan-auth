/**
 * Staff.js
 * A model for storing all staff information
 * Table Name   :   staff
 * Database     :   postgres
 */

module.exports = {
    tableName: 'staff',
    attributes: {
        roleId: {
            type: "number",
            required: false,
            defaultsTo: 0,
            columnName: "role_id",
            columnType: "smallint DEFAULT 0"
        },
        name: {
            type: "string",
            required: false,
            columnName: "name",
            columnType: 'varchar(255) NOT NULL'
        },
        email: {
            type: "string",
            required: false,
            columnName: "email",
            columnType: 'citext NOT NULL'
        },
        password: {
            type: "string",
            required: false,
            columnName: "password",
            columnType: 'varchar(255) NOT NULL'
        },
        contactNumber: {
            type: "string",
            required: false,
            columnName: "contact_number",
            columnType: 'varchar(127) NOT NULL'
        },
        lastLoginTimestamp: {
            type: "ref",
            required: false,
            columnName: "last_login_timestamp",
            columnType: "timestamp(0) DEFAULT NULL"
        },
        status: {
            type: "boolean",
            required: false,
            defaultsTo: true,
            columnType: "boolean NOT NULL DEFAULT TRUE"
        },
        timezoneId: {
            type: "number",
            required: false,
            defaultsTo: 33,
            columnName: "timezone_id",
            columnType: "smallint NOT NULL DEFAULT 33"
        },
        deletedAt: {
            type: "ref",
            required: false,
            columnName: "deleted_at",
            columnType: "timestamp(0) DEFAULT NULL"
        },
    }
};

