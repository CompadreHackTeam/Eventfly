/**
 * Author : Alberto de la Fuente Cruz
 *
 * Event model repository
 * */

var mongoose    = require('mongoose');
var Event       = mongoose.model('event');
var Tag         = mongoose.model('tag');

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
            owner: 1,
            tagList: obj.tagList
            /*messageList: */

        });

        //Now we save (if not exists) the tags associated to the event previously saved
        for (var i in obj.tagList) {
            saveTagsFromEvent(obj.tagList[i]);
        }
        event.save(function (err) {
            if (err != null) {
                callback(err, obj);
            }else{
                callback(null, obj);
            }
        });
    }
    else{
        callback(new Error(), obj);
    }
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
            owner: 1,
            tagList: obj.tagList
            /*messageList: */

        });

        //Now we save (if not exists) the tags associated to the event previously saved
        for (var i in obj.tagList) {
            saveTagsFromEvent(obj.tagList[i]);
        }
        event.save(function (err) {
            if (err != null) {
                callback(err, obj);
            }else{
                callback(null, obj);
            }
        });
    }
    else{
        callback(new Error(), obj);
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