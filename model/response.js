/**
 * Author : Alberto de la Fuente Cruz
 *
 * RESPONSE model for mongoDB in mongoose.Schema
 * */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('response', new Schema({
    /* idResponse (objectID) */

    /* idMessage, objectID of the message where the response belongs */
    idMessage : String,

    /*idOwner, objectID of the user that posted the response */
    idOwner : Number,

    date : {
        type : Date,
        default : Date.now
    },

    body : String
}));
