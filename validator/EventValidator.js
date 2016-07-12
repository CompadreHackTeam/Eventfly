/**
 * Author : Alberto de la Fuente Cruz
 * 
 * Event JSON validator 
 */

var revalidator = require('revalidator');

/**
 * validateEvent
 * Validates an event from a Json object if it's well formed
 * @param jsonObj, event object
 * @param callback
 */
exports.validateEvent = function (jsonObj, callback){
    
    if (revalidator.validate(jsonObj,
            {
                properties: {
                    name: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    },
                    latitude: {
                        type: 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    longitude: {
                        type: 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    radius: {
                        type: 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    type: {
                        type: 'String',
                        required: false,
                        allowEmpty: true
                    },
                    tagList: {
                        //type : 'String', if I try to put it in [String] format this is the end my only friend
                        required: false,
                        allowEmpty: false
                    }
                }
            }).valid == false) {
        callback(new Error());
    } else {
        callback(null);
    }
};
