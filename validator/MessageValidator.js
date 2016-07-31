/**
 * Author : Alberto de la Fuente Cruz
 *
 * Message JSON validator
 */

var revalidator = require('revalidator');

/**
 * validateMessage
 * Validates a message from a Json object if it's well formed
 * @param jsonObj
 * @param callback
 */
exports.validateMessage = function (jsonObj, callback){
    if (revalidator.validate(jsonObj,
            {
                properties: {
                    idEvent: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    },
                    idOwner: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    },
                    body: {
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