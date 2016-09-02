/**
 * Author : Ricardo, Alberto
 *
 * User controller for server
 * */

var userRepository = require("./../repository/UserRepository.js");
var userValidator  = require("./../validator/UserValidator.js");
var jwt            = require('jsonwebtoken');
var config         = require('../server.properties');

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

/**
 * If email and password ok returns a jwt token authentication
 * @param req
 * @param res
 */
exports.authenticateUser = function (req, res) {

    var fields = req.body;

    userRepository.authenticate(fields.email, fields.password , function (err, token) {
        
        if (err != null) {
            res.writeHead(401, {'content-type': 'text/plain'});
            res.write(err);
            res.end();
        } else {
            res.json({ token: token });
        }
    });
};

/**
 * Returns an user object from a gcmToken
 * @param req
 * @param res
 */
exports.getUserByToken = function(req, res){

    var userToken = req.body.token; //Token of the user that we are searching for

    userRepository.getUserByToken(userToken, function(err, user){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("Error: User token not found\n" + err);
            res.end();
        }else{
            res.send(user);
        }
    });
};

//TODO remove in production
exports.getAllUsers = function(req, res){

    userRepository.getAllUsers(function(err, obj){
        if(err != null){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.write("See ya in anotha' life brotha\n" + err);
            res.end();
        }else{
            res.send(obj);
        }
    })
};

/**
 * Edit an user given by _id, updating the fields of the document
 * @param req
 * @param res
 */
exports.editUser = function(req, res){

    var fields = req.body;
    var userToken = req.headers.token;

    jwt.verify(userToken, config.jwt, function (err, decoded) {
        if (err) {

            if(err.name == 'TokenExpiredError'){ /* User token expired */
                res.writeHead(401, {'content-type': 'text/plain'});
                res.write("TokenExpiredError");
                res.end();
            }
            else{ /* Something horrible happen */
                res.writeHead(401, {'content-type': 'text/plain'});
                res.write("Unauthorized");
                res.end();
            }

        } else {
            fields.owner = decoded; /* gets the idUser */
            userRepository.updateUser(fields.owner, fields, function(err){
                if(err != null){
                    res.writeHead(400, {'content-type': 'text/plain'});
                    res.write(err);
                    res.end();
                }else{
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('User updated');
                    res.end();
                }
            })
        }
    });
};

