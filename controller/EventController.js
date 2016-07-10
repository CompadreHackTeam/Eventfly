/**
 * Author : Alberto de la Fuente Cruz
 *
 * Event model controller for server
 * */

var mongoose = require("mongoose");
var Event = mongoose.model('event');
var eventRepository = require("./../repository/EventRepository.js");

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
exports.postEvent = function (req, res) {

    var fields = req.body;
    var revalidator = require('revalidator');
    if (revalidator.validate(fields,
            {
                properties: {
                    name: {
                        type: 'String',
                        required: true,
                        allowEmpty: false
                    },
                    latitude: {
                        type: 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    longitude: {
                        type: 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    radius: {
                        type: 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    type: {
                        type: 'String',
                        required: false,
                        allowEmpty: true
                    },
                    tagList: {
                        //type : 'String', si intento ponerlo en formato de lista '[String]' peta
                        required: false,
                        allowEmpty: false
                    }
                }
            }).valid == false) {
        res.writeHead(400, {'content-type': 'text/plain'});
        res.write("Error: invalid JSON object");
        res.end();
    } else {
        eventRepository.saveEvent(fields, function (fields, err) {
            if (err != null) {
                res.writeHead(200, {'content-type': 'text/plain'});
                res.write('Guardado en MongoDB : \n\n');
                res.end(util.inspect({
                    fields: fields
                }));
                console.log("Todo guay todo chachi")
            } else {
                res.writeHead(400, {'content-type': 'text/plain'});
                res.write("Error: " + err);
                res.end();
                console.log("Error: " + err);
                ;
            }
        });
    }
};
