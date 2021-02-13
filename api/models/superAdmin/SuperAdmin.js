/**
 * SuperAdmin.js
 * A model for storing all super admins.
 * Table Name   :   super_admin
 * Database     :   postgres
 */

module.exports = {
    tableName: 'super_admin',
    attributes: {
        name: {
            type: "string",
            required: false,
            columnName: "name",
            columnType: 'varchar(255) NOT NULL'
        },
        email: {
            type: "string",
            required: true,
            unique: true,
            columnName: "email",
            columnType: 'citext NOT NULL UNIQUE'
        },
        contactNumber: {
            type: "string",
            required: false,
            columnName: "contact_number",
            columnType: "varchar(23) NOT NULL"
        },
        password: {
            type: "string",
            required: false,
            columnName: "password",
            columnType: 'varchar(255) NOT NULL'
        },
        isEnabled: {
            type: "boolean",
            required: false,
            defaultsTo: true,
            columnName: "is_enabled",
            columnType: "boolean DEFAULT TRUE"
        },
        lastLoginTimestamp: {
            type: "ref",
            required: false,
            columnName: "last_login_timestamp",
            columnType: "timestamp(0) DEFAULT NULL"
        },
        timezoneId: {
            type: "number",
            required: false,
            defaultsTo: 33,
            columnName: "timezone_id",
            columnType: "smallint NOT NULL DEFAULT 33"
        },
    }
};

