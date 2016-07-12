/**
 * Author : Alberto de la Fuente Cruz
 *
 * Tag model controller for server
 * */

var tagRepository = require('./../repository/TagRepository');
var tagValidator    = require('./../validator/TagValidator');

var util        = require("util");

/**
 * getTags
 * Returns all the tags saved in mongoDB
 */
exports.getTags = function(req, res){

    tagRepository.getTags(function(err, tags){
       if(err != null){
           res.send("Error: "  + err);
           res.end();
       }else{
           res.send(tags);
       }
    });
};

/**
 * CreateTag
 * Save a tag in mongoDB from a json object
 */
exports.createTag = function(req, res){

    var fields = req.body;

    tagValidator.validateTag(fields, function(err){
        if(err != null){
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: Invalid JSON object");
            res.end();
        }else{
            tagRepository.saveTag(fields, function(err, tagObj){
                if(err != null){
                    res.writeHead(400, {'content-type' : 'text/plain'});
                    res.write("Error: " + err);
                    res.end();
                }else{
                    res.writeHead(200, {'content-type' : 'text/plain'});
                    res.write('Saved in MongoDB : \n\n');
                    res.end(util.inspect({
                        fields : tagObj
                    }));
                }
            });
        }
    });
};

/**
 * deleteTags
 * delete all tags saved in the BD
 */
exports.deleteTags = function (req, res) {

    tagRepository.deleteTags(function(err){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.status(200).json({status: "All Tags deleted"});

        }
    });
};