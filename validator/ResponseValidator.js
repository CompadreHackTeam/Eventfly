/**
 * Author : Alberto de la Fuente Cruz
 * 
 * Response JSON validator
 */

var revalidator = require('revalidator');

exports.validateResponse = function(jsonObj, callback){
    
    if (revalidator.validate(jsonObj,
            {
                properties: {
                    idMessage: {
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
}