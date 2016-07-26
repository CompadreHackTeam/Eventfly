/**
 * THUMBNAIL OBJECT
 *
 * This is the Image for MongoDB in mongoose.Schema
 * Note : the _id field is set with the same _id which is generated for an image, so have the same id but in different schemas
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Thumbnail', new Schema({ 
    data: Buffer, 
    contentType: String, 
    _id: String
}));