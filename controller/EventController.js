/**
 * Author : Alberto de la Fuente Cruz
 *
 * Event model controller for server
 * */

var mongoose = require("mongoose");
var Event = mongoose.model('event');
var eventRepository = require("./../repository/EventRepository.js");
var eventValidator = require("./../validator/EventValidator.js");

var formidable = require("formidable");
var util = require("util");

/**
 * @method getEvents
 * returns all events saved in the BD
 */
exports.getEvents = function (req, res) {
    var events;
    eventRepository.findEvents(events, function(err, events){
        if(err != null){ // if an error occurred
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(events);
        }
    });
};

/**
 * @method getEventsByLocation
 * returns all events near to a location (latitude, longitude) saved in the BD
 */
exports.getEventsByLocation = function (req, res) {

    var latitude = req.params.latitude; //latitude from param
    var longitude = req.params.longitude; //longitude from param
    var radius = parseInt(req.params.radius); //radious of the maxDistance
    var events;
    eventRepository.findNearEvents(latitude, longitude, radius, events, function(err, events){
        if(err != null){
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: " + err);
            res.end();
        }else{
            res.send(events);
        }
    });
};

/**
 * Delete al events
 * TODO : REMOVE IN PRODUCTION
 * @param req
 * @param res
 */
exports.deleteEvents = function (req, res) {
    Event.remove({}, function (err, result) {
        if (err) console.log("Error: " + err);
    });
    res.status(200).json({status: "All Events deleted"});
};

/**
 * @method postEvent
 * add a event from a form to the BD
 */
exports.postEvent = function (req, res){

    var fields = req.body;

    eventValidator.eventValidator(fields, function(err){
        if(err != null){//If validator returns error
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: Invalid JSON object");
            res.end();
        }else{//If validator says ok to JSON object we save it in mongo
            eventRepository.saveEvent(fields, function (fields, err) {
                if (err != null) {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('Saved in MongoDB : \n\n');
                    res.end(util.inspect({
                        fields: req.body
                    }));
                } else {
                    res.writeHead(400, {'content-type': 'text/plain'});
                    res.write("Error: " + err);
                    res.end();
                    console.log("Error: " + err);
                }
            });
        }
    });
};

