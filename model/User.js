/**
 *  Author : Ricardo
 *
 *  USER model for MongoDB in mongoose.Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Password is stored as hash
module.exports = mongoose.model('user', new Schema({

    name: String,
    email: String,
    gcm_token: String,
    token: String,
    hash: String

}));
