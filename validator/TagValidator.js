/**
 * Author : Alberto de la Fuente Cruz
 * 
 * Tag JSON object validator
 */

var revalidator = require('revalidator');

/**
 * validateTag
 * Validates a tag from a JSON object if it's well formed
 * @param jsonObj, tag object
 * @param callback
 */
exports.validateTag = function(jsonObj, callback){
    if (revalidator.validate(jsonObj,
            {
                properties: {
                    name: {
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