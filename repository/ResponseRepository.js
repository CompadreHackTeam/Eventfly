/**
 * Author : Alberto de la Fuente Cruz
 * 
 * Response model repository
*/

var mongoose    = require('mongoose');
var Response    = mongoose.model('response');

/**
 * findResponses
 * Returns all responses saved in mongoDB
 * @param callback
 */
exports.findResponses = function(callback){
    
    Response.find({}, function(err, obj){
        if(err != null){
            callback(err, null);
        }else {
            callback(null, obj);
        }
    });
};

/**
 * findResponseByMsgId
 * finds all responses to a Msg given by msgId
 * @param msgId, id of the msg that we are searching for responses
 * @param callback
 */
exports.findResponseByMsgId = function(msgId, callback){

    Response.find({idMessage: msgId}, function (err, obj) {
       if(err != null){
           callback(err, null);
       }else{
           callback(null, obj);
       }
    });
};

exports.saveResponse = function(responseObj, callback){

    var response = new Response({
        idMessage   : responseObj.idMessage,
        idOwner     : responseObj.owner,
        body        : responseObj.body
    });
    
    response.save(function(err){
        if(err != null){
            callback(err, null);
        }else{
            callback(null, responseObj);
        }
    });  
};