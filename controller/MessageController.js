/**
 * Author : Alberto de la Fuente Cruz
 *
 * Message model controller for server
 * */


var mongoose            = require('mongoose');
var Message             = mongoose.model('message');
var messageRepository   = require("./../repository/MessageRepository.js");


var formidable          = require('formidable');
var util                = require('util');


/**
 * getMessages
 * Returns all the Messages saved in mongoDB
 */
exports.getMessages = function(req, res){

    var messages;
    messageRepository.findMessages(messages, function (err, messages){
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
    var idEvent = req.params.eventId;
    var messages;
    messageRepository.findMessageByIdEvent(idEvent, messages, function(err, messages){
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
 * @method 
 * Save in mongoDB a message from a Json objecto
 */
exports.postMessage = function(req, res){
   
    var fields = req.body;
    
    var message = new Message({
        idEvent         : fields.idEvent,
        idOwner         : 1,
        //TODO responseList    : wat?
        likes           : 0, //New message, 0 likes
        body            : fields.body
    });
    
    message.save(function(err){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.writeHead(200, {'content-type' : 'text/plain'});
            res.write('Guardado en MongoDB: \n\n');
            res.end(util.inspect({
                fields: fields
            }));
        }
                
    });
};
