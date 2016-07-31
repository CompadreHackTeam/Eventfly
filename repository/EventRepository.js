/**
 * Author : Alberto de la Fuente Cruz
 *
 * Event model repository
 * */

var mongoose            = require('mongoose');
var Event               = mongoose.model('event');
var notificationService = require('./../service/NotificationService');


/**
 * findEvents, returns all the events saved in mongo
 */
exports.findEvents = function(callback){

    Event.find({}, function (err, obj) {
        if (err != null) { // if an error occurred
            callback(err, obj);
        } else { 
            callback(null, obj);
        }
    });
};

/**
 * findEventsByLocation, returns all events that are inside a certain radius near a latitude and longitude
 */
exports.findNearEvents = function(latitude, longitude, radius, callback){
    Event.find({
        "loc": {
            $near: {
                $geometry: {type: "Point", coordinates: [latitude, longitude]}, $maxDistance: radius
            }
        }
    }, function (err, events) {
        if (err != null) { // if an error occurred
           callback(err, events)
        } else {
            callback(null, events);
        }
    });
};

/**
 * findEventsByTag
 * returns all the events associated to a tag
 * @param tagName, tag name that we are searching for
 * @param callback
 */
exports.findEventsByTag = function(tagName, callback){

    Event.find({
        tagList: { "$in" : [tagName.toLowerCase()]}
    }, function(err, obj){
        if(err != null){
            callback(err, null);
        }else{
            callback(null, obj);
        }
    });
};

/**
 * saveEvent, save an event in mongo
 * @param obj, event params
 * @param callback
 */
exports.saveEvent =  function(obj, callback){
    if(obj != null){
        for (var i in obj.tagList) {
            obj.tagList[i] = obj.tagList[i].toLowerCase();
        }
        var event = new Event({
            name: obj.name,
            latitude: obj.latitude,
            longitude: obj.longitude,
            loc: {
                type: "Point",
                coordinates: [obj.latitude, obj.longitude],
                index: String
            },
            type: obj.type,
            radius: obj.radius,
            owner: obj.owner,
            tagList: obj.tagList
            /*messageList: */

        });

        event.save(function (err) {
            if (err != null) {
                callback(err, null);
            }else{
                callback(null, event);
            }
        });
        notificationService.resolveNewMessage(obj.idEvent, obj.owner);

    }
    else{
        callback(new Error(), obj);
    }

};

exports.getNameById = function(eventId, callback){
    Event.findOne({ _id : eventId }, function(err, obj){
        if(err) callback(err, null);
        else{
            callback(null, obj.name);
        }
    })
};
