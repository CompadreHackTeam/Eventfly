/**
 * Created by alberto on 11/07/16.
 *
 * User JSON validator
 */

var revalidator = require('revalidator');

/**
 * @param jsonObj
 * @param callback
 */
exports.validateUser = function (jsonObj, callback) {

    if (revalidator.validate(jsonObj,
            {
                properties: {
                    name: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    },
                    email: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    },
                    photo: {
                        type: 'String',
                        required: false,
                        allowEmpty: true
                    },
                    gcm_token: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    }
                }
            }).valid == false) {
        callback(new Error());
    } else {
        callback(null);
    }
};

exports.validateUserUpdate = function (jsonObj, callback) {

    if (revalidator.validate(jsonObj,
            {
                properties: {
                    photo: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    }
                }
            }).valid == false) {
        callback(new Error());
    } else {
        callback(null);
    }
};
