/**
 * Created by alberto on 11/07/16.
 * 
 * Event JSON validator 
 */

var revalidator = require('revalidator');

exports.eventValidator = function (jsonObj, callback){
    
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
