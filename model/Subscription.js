/**
 * Author : Alberto
 *
 * Subscription model for MongoDB in mongoose.Schema
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

module.exports  = mongoose.model('subscription', new Schema({

    /* Id of the event that owns this subscribers list*/
    idEvent     : String,
    eventName   : String,
    /* Subscribers gcm_tokens list */
    userTokens  : [String]

}));
