/**
 * Author : Alberto de la Fuente Cruz
 *
 * MESSAGE model for mongoDB in mongoose.Schema
 * */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('message', new Schema({
    /* idMessage (objectID) */

    /* idEvent, objectID of the event that belongs the message */
    idEvent : String,

    /* idOwner, objectID of the user that defined the message */
    idOwner : Number,

    /* responseList, a list of objectIDs with all the responses of a certain message */
    responseList : [ String ],

    likes : Number,
    body : String,
    date : {
        type : Date,
        default : Date.now
    }
}));
