/**
 * Author : Alberto de la Fuente Cruz
 *
 * Message model repository
 * */

var mongoose    = require("mongoose");
var Message     = mongoose.model('message');

/**
 * findMessages, returns all the messages saved in mongo
 * @param obj, all messages from mongo
 * @param callback
 */
exports.findMessages = function(obj, callback){
    
    Message.find({}, function(err, obj){
        if(err != null){
            callback(err, obj);
        }else{
            callback(null, obj);
        }
    });
};

/**
 * findMessagesByIdEvent, returns all the messages from an event
 * @param idEvent, mongoId of the event
 * @param obj, all messages from the event
 * @param callback 
 */
exports.findMessageByIdEvent = function(idEvent, obj, callback){

    Message.find({idEvent: idEvent}, function (err, obj) {
        if (err != null) {
            callback(err, obj);
        } else {
            callback(null, obj);
        }
    });
};

exports.saveMessage = function(obj, callback){
    
    var message = new Message({
        idEvent         : obj.idEvent,
        idOwner         : 1, //TODO change when user are added
        likes           : 0, //New message, 0 likes
        body            : obj.body
    });
    message.save(function(err){
        if(err != null){
           callback(err, null);
        }else{
            callback(null, message);
        }

    });
}