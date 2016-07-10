/**
 * Author : Ricardo
 *
 * GCM Push Notification Service
 */

var gcm = require('node-gcm');
var config = require('../server.properties');
var sender;

module.exports = {

    /**
     * Init function to set the API key
     */
    setup: function () {

        // Set up the sender with the API key
        sender = new gcm.Sender(config.gcm_api_key);

    },

    sendNotificationToEventSubscribers: function (regtokens, title, body) {

        var message = new gcm.Message();

        message.addData('EventFly', 'Notification');
        message.addNotification('title', title);
        message.addNotification('icon', 'ic_launcher');
        message.addNotification('body', body);


        sender.send(message, regTokens, function (err, response) {
            if (err) {
                console.error(err);
            } else {
                console.log(response);
            }
        });
    }
};