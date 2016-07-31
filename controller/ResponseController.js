/**
 * Author : Alberto
 *
 * Response model controller for server
 * */

var responseRepository  = require('./../repository/ResponseRepository');
var responseValidator   = require('./../validator/ResponseValidator');

var jwt                 = require('jsonwebtoken');
var config              = require('../server.properties');

/**
 * getRespones
 * Returns all the Responses to messages
 */
exports.getResponses = function(req, res){

    responseRepository.findResponses(function(err, obj){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(obj);
        }
    });
};


/**
 * getResponseByMessage
 * Returns all Responses of a certain message saved in mongoDB
 */
exports.getResponseByMessage = function(req, res){
    var msgId = req.params.messageId;

    responseRepository.findResponseByMsgId(msgId, function(err, responses){
        if (err != null) {
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        } else {
            res.send(responses);
        }
    });
};

/**
 * createResponse
 * Saves in mongoDB a response to a message
 */
exports.createResponse = function(req, res){
    
    var fields = req.body;
    var userToken = req.headers.token;

    jwt.verify(userToken, config.jwt, function (err, decoded) {
        if (err) {
            res.writeHead(401, {'content-type': 'text/plain'});
            res.write("Unauthorized");
            res.end();
        } else {
            // Request OK
            // Add the user ID to the Event Object
            fields.owner = decoded.sub;

            responseValidator.validateResponse(fields, function (err) {
                if (err != null) {
                    res.writeHead(400, {'content-type': 'text/plain'});
                    res.write("Error: Invalid JSON object");
                    res.end();
                } else {
                    responseRepository.saveResponse(fields, function (err, obj) {
                        if (err != null) {
                            res.writeHead(400, {'content-type': 'text/plain'});
                            res.write("Error: " + err);
                            res.end();
                        } else {
                            res.writeHead(200, {'content-type': 'text/plain'});
                            res.end();
                        }
                    });
                }
            });
        }
    });

};