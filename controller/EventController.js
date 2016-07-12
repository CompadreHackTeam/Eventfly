/**
 * Author : Alberto de la Fuente Cruz
 *
 * Event model controller for server
 * */

var eventRepository = require("./../repository/EventRepository.js");
var eventValidator = require("./../validator/EventValidator.js");
var jwt = require('jsonwebtoken');
var config = require('../server.properties');

/**
 * getEvents
 * returns all events saved in the BD
 */
exports.getEvents = function (req, res) {

    eventRepository.findEvents(function (err, events) {
        if (err != null) { // if an error occurred
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: " + err);
            res.end();
        } else {
            res.send(events);
        }
    });
};

/**
 * getEventsByLocation
 * returns all events near to a location (latitude, longitude) saved in the BD
 */
exports.getEventsByLocation = function (req, res) {

    var latitude = req.params.latitude; //latitude from param
    var longitude = req.params.longitude; //longitude from param
    var radius = parseInt(req.params.radius); //radious of the maxDistance

    eventRepository.findNearEvents(latitude, longitude, radius, function (err, events) {
        if (err != null) {
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: " + err);
            res.end();
        } else {
            res.send(events);
        }
    });
};

/**
 * Delete all events
 * TODO : REMOVE IN PRODUCTION
 * @param req
 * @param res
 */
exports.deleteEvents = function (req, res) {

    var mongoose = require("mongoose");
    var Event = mongoose.model('event');

    Event.remove({}, function (err, result) {
        if (err) console.log("Error: " + err);
    });
    res.status(200).json({status: "All Events deleted"});
};

/**
 * createEvent
 * add a event from a form to the BD
 */
exports.createEvent = function (req, res) {

    var fields = req.body;

    jwt.verify(fields.token, config.jwt, function (err, decoded) {
        if (err) {
            res.writeHead(401, {'content-type': 'text/plain'});
            res.write("Unauthorized");
            res.end();
        } else {
            // Request OK
            // Add the user ID to the Event Object
            fields.owner = decoded.sub;

            eventValidator.validateEvent(fields, function (err) {
                if (err != null) {//If validator returns error
                    res.writeHead(400, {'content-type': 'text/plain'});
                    res.write("Error: Invalid JSON object");
                    res.end();
                } else {//If validator says ok to JSON object we save it in mongo
                    eventRepository.saveEvent(fields, function (err, fields) {
                        if (err != null) {
                            res.writeHead(400, {'content-type': 'text/plain'});
                            res.write("Error: " + err);
                            res.end();
                        } else {
                            res.writeHead(200, {'content-type': 'text/plain'});
                            res.end();
                        }
                    });
                }
            });
        }
    });
};

