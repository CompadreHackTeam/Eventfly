/**
 * Author : Alberto de la Fuente Cruz
 *
 * Message model repository
 */

var mongoose    = require("mongoose");
var Message     = mongoose.model('message');

/**
 * Returns all the messages saved in mongo
 * @param callback
 */
exports.findMessages = function (callback) {

    Message.find({}, function (err, obj) {
        if (err != null) {
            callback(err, obj);
        } else {
            callback(null, obj);
        }
    });
};

/**
 * Returns all the messages from an event
 * @param idEvent, mongoId of the event
 * @param callback
 */
exports.findMessageByIdEvent = function (idEvent, callback) {

    Message.find({idEvent: idEvent}, function (err, obj) {
        if (err != null) {
            callback(err, obj);
        } else {
            callback(null, obj);
        }
    });
};

/**
 * This method save a Message binded to an user and event
 * @param obj       The message to save
 * @param callback  The callback for response
 */
exports.saveMessage = function (obj, callback) {

    var message = new Message({
        idEvent: obj.idEvent,
        idOwner: obj.owner,
        likes: 0, //New message, 0 likes
        body: obj.body
    });

    message.save(function (err) {
        if (err != null) {
            callback(err, null);
        } else {
            callback(null, message);
        }

    });
};