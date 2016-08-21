/**
 * Created by alberto on 11/07/16.
 *
 * User JSON validator
 */

var revalidator = require('revalidator');

/**
 * TODO : IMPLEMENT
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
                    password: {
                        type : 'String',
                        required : true,
                        allowEmpty : false
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
