/**
 * Author : Ricardo
 *
 * UserRepository
 */

var mongoose        = require("mongoose");
var User            = mongoose.model('user');
var jwt             = require('jsonwebtoken');
var bcrypt          = require('bcryptjs');
var config          = require('../server.properties');


/**
 * This function authenticate an user
 * @param           email user email
 * @param           password  user password
 * @returns {*}     coso
 */
exports.authenticate = function (email, password, callback) {

    User.findOne({email: email}, function (err, user) {
        if (err) callback(err, null);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful ( generate the secret anywhere in a file)
            callback(null, jwt.sign({sub: user._id}, config.jwt));
        } else {
            // authentication failed
            callback("Auth Failed", null);
        }
    });
};

/**
 * This function creates an user in the DB
 * @param           userParam The user
 * @returns {*}     coso
 */
exports.create = function (obj, callback) {

    // validation
    User.findOne({email: obj.email}, function (err, user) {

        if (err) callback(err, null);

        if (user) {
            // username already exists
            callback('Email "' + user.email + '" is already taken', null);
        } else {

            var newUser = new User({
                name: obj.name,
                email: obj.email,
                gcm_token: obj.gcm_token,
                hash: bcrypt.hashSync(obj.password, 10)

            });

            // save user in the db
            newUser.save(function (err) {
                if (err != null) {
                    callback(err, null);
                } else {
                    callback(null, newUser);
                }
            });
        }
    });
};
