/**
 *  Author : Alberto de la Fuente Cruz
 *
 *  USER model for MongoDB in mongoose.Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('user', new Schema(({
    /* idUser (objectID) */

    name : String,
    password : String,
    email : String
})));
