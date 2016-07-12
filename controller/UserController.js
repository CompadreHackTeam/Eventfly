/**
 * Author : Ricardo
 *
 * User controller for server
 * */

var userRepository = require("./../repository/UserRepository.js");
var userValidator = require("./../validator/UserValidator.js");

/**
 * @method getEvents
 * returns all events saved in the BD
 */
exports.registerUser = function (req, res) {

    var fields = req.body;

    userValidator.validateUser(fields, function (err) {
        if (err != null) {//If validator returns error
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: Invalid JSON object");
            res.end();
        } else {
            //If validator says ok to JSON object we save it in mongo
            userRepository.create(fields, function (err, user) {
                if (err != null) {
                    res.writeHead(400, {'content-type': 'text/plain'});
                    res.write(err);
                    res.end();
                } else {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('User Created : ' + user.email);
                    res.end();
                }
            });
        }
    });

};

exports.authenticateUser = function (req, res) {

    var fields = req.body;

    userRepository.authenticate(fields.email, fields.password , function (err, token) {
        if (err != null) {
            res.writeHead(401, {'content-type': 'text/plain'});
            res.write(err);
            res.end();
        } else {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('Token : ' + token);
            res.end();
        }
    });
};

exports.getUserById = function(req, res){

    //TODO repository
};