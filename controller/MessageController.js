/**
 * Author : Alberto
 *
 * Message model controller for server
 * */

var messageRepository   = require('./../repository/MessageRepository.js');
var messageValidator    = require('./../validator/MessageValidator');
var notificationService = require('./../service/NotificationService');

var jwt                 = require('jsonwebtoken');
var config              = require('../server.properties');


/**
 * getMessages
 * Returns all the Messages saved in mongoDB
 */
exports.getMessages = function(req, res){

    messageRepository.findMessages(function (err, messages){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(messages);
        }
    });
};

/**
 * @method getMessageByEvent
 * returns messages of a certain eventId 
 */
exports.getMessageByEvent = function(req, res){

    messageRepository.findMessageByIdEvent(req.params.eventId, function(err, messages){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(messages);
        }
    });
};

/**
 * @method getMessagesAndUsersByEvent
 * returns messages and the data of the users that posted them
 */
exports.getMessagesAndUsersByEvent = function(req, res){

    messageRepository.findMessagesAndUsersByIdEventWithUser(req.params.eventId, function(err, messages){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(messages);
        }
    });
};

/**
 * Create Message
 * Add to mongo a messages associated to an event from a JSON object
 */
exports.createMessage = function(req, res){
   
    var fields = req.body;
    var userToken = req.headers.token;

    jwt.verify(userToken, config.jwt, function (err, decoded) {
        if (err) {

            if(err.name == 'TokenExpiredError'){ /* User token expired */
                res.writeHead(401, {'content-type': 'text/plain'});
                res.write("TokenExpiredError");
                res.end();
            }
            else{ /* Something horrible happen */
                res.writeHead(401, {'content-type': 'text/plain'});
                res.write("Unauthorized");
                res.end();
            }

        } else {
            fields.owner = decoded; /* gets the idUser */
            
            messageValidator.validateMessage(fields, function (err) {
                if (err != null) {
                    res.writeHead(400, {'content-type': 'text/plain'});
                    res.write("Error: Invalid JSON object");
                    res.end();
                } else {
                    messageRepository.saveMessage(fields, function (err) {
                        if (err != null) {
                            res.writeHead(400, {'content-type': 'text/plain'});
                            res.write("Error: " + err);
                            res.end();
                        } else {
                            res.writeHead(200, {'content-type': 'text/plain'});
                            res.end();
                        }
                    });
                    notificationService.resolveNewMessage(fields.idEvent, fields.owner);
                }
            });
        }
    });
};
