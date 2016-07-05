/**
 * This is the main app for GeoMessage app.js
 *
 * @type {*|exports|module.exports}
 */
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    DatabaseManager     = require('./manager/databasemanager.js'),
    config              = require('./Eventfly.properties'),
    auth                = require("http-auth"),

    /* Now we get our mongoose model images */
    User                = require('./model/user'),
    Tag                 = require('./model/tag'),
    Event               = require('./model/event'),
    Message             = require('./model/message'),
    Response            = require('./model/response'),

    /* And now summon the controllers */
    eventController     = require('./controller/eventController');
    tagController       = require('./controller/tagController');
    messageController   = require('./controller/messageController');
    responseController  = require('./controller/responseController');

// Create the database connection
DatabaseManager.connectDB();

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + "/public/"));

//  Setting in eventfy.properties file the global security, in server.auth the authentication data
if (config.globalsecurity) {
    var basic = auth.basic({
        realm: "Backend Area.",
        file: './server.auth'
    });
    app.use(auth.connect(basic));
}
var controller = express.Router();
app.use(controller);
// Add /api after port and before the methods of route
app.use('/api', controller);


// API routes

/* <Events route> */
controller.route('/getEvents')
    .get(eventController.getEvents);

controller.route('/getEventsByLocation/:latitude/:longitude/:radius')
    .get(eventController.getEventsByLocation);

controller.route('/deleteEvents')
    .get(eventController.deleteEvents);

controller.route('/postEvent')
    .post(eventController.postEvent);


/* </Events route> */

/* <Tags route> */
controller.route('/getTags')
    .get(tagController.getTags);
controller.route('/postTag')
    .post(tagController.postTag);
controller.route('/deleteTags')
    .get(tagController.deleteTags);
/* </Tags route> */

/* <Messages route> */
controller.route('/getMessages')
    .get(messageController.getMessages);
controller.route('/getMessage/:eventId')
    .get(messageController.getMessageByEvent);
controller.route('/postMessage')
    .post(messageController.postMessage);
/* </Messages route> */

/* <Responses route> */
controller.route('/getResponses')
    .get(responseController.getResponses);
controller.route('/getResponse/:messageId')
    .get(responseController.getResponseByMessage);
controller.route('/postResponse')
    .post(responseController.postResponse);
/* </Responses route> */


// Start server
app.listen(config.port, function () {
    console.log("*** Server Running on " + config.port);
});