/**
 * Author : Alberto de la Fuente Cruz
 * 
 * Tag model repository 
 */

var mongoose    = require("mongoose");
var Tag         = mongoose.model('tag');

/**
 * getTags 
 * returns ALL the tags saved in mongoDB
 */
exports.getTags = function(callback){
   
    Tag.find({}, function(err, tags){
        if(err != null){
            callback(err, null);
        }else{
            callback(null, tags);
        }
    });  
};

/**
 * Save a tag from a JSON obj
 * @param tagObj, tag fields
 * @param callback
 */
exports.saveTag = function(tagObj, callback){

    var tag = new Tag({
        name    : tagObj.name.toLocaleLowerCase() //toLowerCase for standard
    });
    
    tag.save(function(err){
        if(err != null){
            callback(err, null);
        }else{
            callback(null, tag);
        }
    });  
};

/**
 * deleteTags
 * Remove all tags from mongoDB
 * @param callback
 */
exports.deleteTags = function(callback){
    Tag.remove({}, function (err) {
        if(err != null){
            callback(err);
        }else{
            callback(null);
        }
    });  
};

