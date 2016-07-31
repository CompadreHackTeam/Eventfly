/**
 * Author : Ricardo
 *
 * GCM Push Notification Service
 */

var mongoose        = require('mongoose');
var gcm             = require('node-gcm');
var config          = require('../server.properties');
var Subscription    = mongoose.model('subscription');
var userRepository  = require('./../repository/UserRepository');
var eventRepository  = require('./../repository/EventRepository');

var sender;

/*
 Before 31/7/16
 module.exports = {
     setup : function,
     resolveNewMessage : function
 }
 */
/**
 * Init function to set the API key
 */
exports.setup =  function () {

    // Set up the sender with the API key
    sender = new gcm.Sender(config.gcm_api_key);

};

/**
 * This function prepare a notification from a message post in idEvent by idUser
 * It's obtains the gcm tokens list and name from idEvent and userName from idUser
 * @param idEvent, id of the event that we have to notify
 * @param idUser, id of the user that posted the message
 */
exports.resolveNewMessage = function(idEvent, idUser){

    userRepository.getGcmTokenAndNameById(idUser, function(err, gcmToken, userName){
        if(err) console.log(err);
        else{
            Subscription.count({idEvent: idEvent}, function(err, count) {

                console.log(count);
                if(count == 0){ // This will be executed when the user creates an event
                    var subscription =  new Subscription({
                        idEvent : idEvent,
                        userTokens : [gcmToken]
                    });
                    subscription.save(function (err) {
                        if (err != null) {
                            console.log(err)
                        }
                    });
                }else{
                    eventRepository.getNameById(idEvent, function(err, eventName){ // Get the name of the event
                        if(err) console.log(err);
                        else{
                            Subscription.findOneAndUpdate({ idEvent : idEvent}, // Add gcmToken to the document if not exist
                                {$addToSet:{userTokens : gcmToken}}, function(err, doc){
                                    if(err != null){
                                        console.log(err);
                                    }
                                    else{
                                        var regTokens = new Array();
                                        regTokens = doc.userTokens;
                                        regTokens.splice(regTokens.indexOf(gcmToken), 1); // Remove the gcmToken of the user that posted the message

                                        sendNotificationToEventSubscribers(regTokens, eventName, userName);
                                    }
                                });
                        }
                    });
                }
            });
        }
    });
};

/**
 * This function broadcast a notification to the users of gcmTokens
 * @param gcmTokens, token list of the subscribers
 * @param eventName, name of the event to notify
 * @param userName, name of the user that launched the notification
 */
function sendNotificationToEventSubscribers(gcmTokens, eventName, userName) {

    var message = new gcm.Message();

    message.addData('EventFly', 'Notification');
    message.addNotification('eventName', eventName);
    message.addNotification('userName', userName);
    console.log("Message { EventName:" + eventName + ", UserName:" + userName + ", gcmTokens: " + gcmTokens);

    sender.send(message, gcmTokens, function (err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });
};