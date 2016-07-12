/**
 * Author : Alberto de la Fuente Cruz
 *
 *  TAG model for MongoDB in mongoose.Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('tag', new Schema(({
    /* idTag (objectID) */

    name : String
})));