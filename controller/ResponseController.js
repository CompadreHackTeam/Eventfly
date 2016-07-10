/**
 * Author : Alberto de la Fuente Cruz
 *
 * Response model controller for server
 * */


var mongoose    = require("mongoose");
var Response    = mongoose.model('response');

var formidable  = require("formidable");
var util        = require("util");


/**
 * @method getRespones
 * Returns all the Responses of Messages saved in mongoDB
 */
exports.getResponses = function(req, res){

    Response.find({}, function(err, responses){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(responses);
        }
    });
};


/**
 * @method getResponseByMessage
 * Returns all Responses of a certain message saved in mongoDB
 */
exports.getResponseByMessage = function(req, res){
    var messageId = req.params.messageId;
    Response.find({idMessage: messageId}, function (err, response) {
        if (err != null) {
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        } else {
            res.send(response);
        }
    });
};

/**
 * @method postResponse
 * Saves in mongoDB a response to a message
 */
exports.postResponse = function(req, res){
    
    var fields = req.body;
    
    var response = new Response({
        idMessage   : fields.idMessage,
        idOwner     : 1,
        body        : fields.body
    })
    response.save(function(err){
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