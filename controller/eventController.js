/**
 * Author : Alberto de la Fuente Cruz
 *
 * Event model controller for server
 * */

var mongoose = require("mongoose");
var Event = mongoose.model('event');
var Tag = mongoose.model('tag');

var formidable = require("formidable");
var util = require("util");

/**
 * @method getEvents
 * returns all events saved in the BD
 */
exports.getEvents = function (req, res) {

    Event.find({}, function (err, events) {
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
 * @method getEventsByLocation
 * returns all events near to a location (latitude, longitude) saved in the BD
 */
exports.getEventsByLocation = function (req, res) {

    var latitude = req.params.latitude; //latitude from param
    var longitude = req.params.longitude; //longitude from param
    var radius = parseInt(req.params.radius); //radious of the maxDistance

    Event.find({
        "loc": {
            $near: {
                $geometry: {type: "Point", coordinates: [latitude, longitude]}, $maxDistance: radius
            }
        }
    }, function (err, events) {
        if (err != null) { // if an error occurred
            res.writeHead(400, {'content-type': 'text/plain'});
            res.write("Error: " + err);
            res.end();
        } else {
            res.send(events);
        }
    });
};

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
                        type : 'String',
                        required: true,
                        allowEmpty: false
                    },
                    latitude: {
                        type : 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    longitude: {
                        type : 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    radius: {
                        type : 'Number',
                        required: true,
                        allowEmpty: false
                    },
                    type: {
                        type : 'String',
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
        for (var i in fields.tagList) {
            fields.tagList[i] = fields.tagList[i].toLowerCase();
        }
        var event = new Event({
            name: fields.name,
            latitude: fields.latitude,
            longitude: fields.longitude,
            //type            : "Point",
            //loc             : [fields.latitude, fields.longitude],
            loc: {
                type: "Point",
                coordinates: [fields.latitude, fields.longitude],
                index: String
            },
            //location.type : "Point",
            //location.coordinates : [fields.latitude, fields.longitude],
            type: fields.type,
            radius: fields.radius,
            owner: 1,
            tagList: fields.tagList
            /*messageList: */

        });

        //Now we save (if not exists) the tags associated to the event previously saved
        for (var i in fields.tagList) {
            saveTagsFromEvent(fields.tagList[i]);
        }
        event.save(function (err) {
            if (err != null) {
                res.writeHead(400, {'content-type': 'text/plain'});
                res.write("Error: " + err);
                res.end();
            } else {

                res.writeHead(200, {'content-type': 'text/plain'});
                res.write('Guardado en MongoDB : \n\n');
                res.end(util.inspect({
                    fields: fields
                }));
            }
        });
    }
};

/**
 * @function saveTagsFromEvent
 * @param tagName, the name of the tag that we are going to search
 * Saves a tag in mongo if already not exists
 */
function saveTagsFromEvent(tagName) {

    Tag.find({name: tagName}).count({}, function (error, numOfDocs) {
        if (error) console.log(error);

        if (numOfDocs == 0) {
            var tag = new Tag({
                name: tagName
            });
            tag.save(function (err) {
                if (err) console.log("Error: " + err);
            });
        }
    });
}