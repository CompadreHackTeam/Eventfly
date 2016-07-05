/**
 * Author : Alberto de la Fuente Cruz
 *
 *  EVENT model for MongoDB in mongoose.Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('event', new Schema({
    /* idEvent (objectID) */

    /*List of tags associated to a determinate event.*/
    tagList: [String],

    /*List of messages by ObjectId associated to a determinate event*/
    messageList: [String],

    /* objectID of the user that created the event */
    owner: Number,

    name: String,
    latitude: Number,
    longitude: Number,
    /*coordinate for $near use*/
    loc: {
        type: {type: String},
        coordinates: [Number]
    },
    radius: Number,
    date: {
        type: Date,
        default: Date.now
    }
}));