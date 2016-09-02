/**
 * Author : Alberto de la Fuente Cruz
 *
 * Message model repository
 */

var mongoose    = require("mongoose");
var Message     = mongoose.model('message');
var User        = mongoose.model('user');

/**
 * Returns all the messages saved in mongo
 * @param callback
 */
exports.findMessages = function (callback) {

    Message.find({}, '-__v -responseList', function (err, obj) {
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

    Message.find({idEvent: idEvent}, '-__v -responseList', function (err, obj) {
        if (err != null) {
            callback(err, obj);
        } else {
            callback(null, obj);
        }
    });
};


exports.findMessagesAndUsersByIdEventWithUser = function (idEvent, callback) {

    Message.find({idEvent: idEvent}, '-__v -responseList', function (err, groups) {

        if (err != null) {
            callback(err, null);
        }
        else {
            if (Object.keys(groups).length == 0) {
                callback(null, []);
            } else {
                var msgOwnersData = [];

                groups.forEach(function (group) {
                    User.findOne({"_id": group.idOwner}, function (err, msgUser) {

                        if (err != null) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            if(msgUser == null){
                                var objNullOwner = {
                                    "idEvent": group.idEvent,
                                    "idOwner": group.idOwner,
                                    "likes": group.likes,
                                    "body": group.body,
                                    "date": group.date,
                                    "owner": {
                                        "name": null,
                                        "email": null,
                                        "photo": null
                                    }
                                };
                                msgOwnersData.push(objNullOwner);
                            }else{
                                var objOwner = {
                                    "idEvent": group.idEvent,
                                    "idOwner": group.idOwner,
                                    "likes": group.likes,
                                    "body": group.body,
                                    "date": group.date,
                                    "owner": {
                                        "name" : msgUser.name,
                                        "email": msgUser.email,
                                        "photo": msgUser.photo
                                    }
                                };
                                msgOwnersData.push(objOwner);
                            }

                        }

                        if (Object.keys(msgOwnersData).length == Object.keys(groups).length) {
                            callback(null, msgOwnersData);
                        }

                    });
                });
            }
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
        idOwner: obj.idOwner,
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