/**
 * Author : Alberto de la Fuente Cruz
 *
 * Tag model controller for server
 * */


var mongoose    = require("mongoose");
var Tag         = mongoose.model('tag');

var formidable  = require("formidable");
var util        = require("util");

/**
 * @method getTags
 * Returns all the tags saved in mongoDB
 */
exports.getTags = function(req, res){

    Tag.find({}, function(err, tags){
        if(err != null){
            res.send("Error: "  + err);
            res.end();
        }else{
            res.send(tags);
        }
    });
};

/**
 * @method postTag
 * Save a tag in mongoDB from a json object
 */
exports.postTag = function(req, res){

    var fields = req.body;
    var tag = new Tag({
        name    : fields.name.toLocaleLowerCase() //toLowerCase for standard
    });

    tag.save(function(err){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.writeHead(200, {'content-type' : 'text/plain'});
            res.write('Guardado en MongoDB : \n\n');
            res.end(util.inspect({
                fields : fields
            }));
        }
    });
};

/**
 * @method deleteTags
 * delete all tags saved in the BD
 */
exports.deleteTags = function (req, res) {
    Tag.remove({}, function (err, result) {
        if(err) console.log("Error: " + err);
    });
    res.status(200).json({status: "All Tags deleted"});
};