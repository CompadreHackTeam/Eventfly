/**
 * Main class for EventFly Server
 */

/** Required dependencies */
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    auth = require("http-auth"),

    /** Managers */
    DatabaseManager = require('./manager/DatabaseManager.js'),

    /** Services */
    NotificationService = require('./service/NotificationService.js'),

    /** Config */
    config = require('./server.properties'),

    /** Controllers Summoning */
    eventController = require('./controller/EventController'),
    messageController = require('./controller/MessageController'),
    responseController = require('./controller/ResponseController'),
    userController = require('./controller/UserController'),
    imageController = require('./controller/ImageController');


/** Create the database connection */
DatabaseManager.connectDB();

/** GCM notifications service setup */
NotificationService.setup();

/** Express Controller */
var controller = express.Router();

/** Middlewares */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
// This line is unnecessary if we dont server a index.html
//app.use(express.static(__dirname + "/public/"));

/**  Setting in eventfy.properties file the global security, in server.auth the authentication data */
if (config.globalsecurity) {
    var basic = auth.basic({
        realm: "Backend Area.",
        file: './server.auth'
    });
    app.use(auth.connect(basic));
}
/** Controller */
app.use(controller);
/** Add /api after port and before the methods of route */
app.use('/api', controller);

/*****************************************************
 //                 API ROUTES
 *****************************************************/

/** <User route> */
controller.route('/registerUser')
    .post(userController.registerUser);

controller.route('/authenticateUser')
    .post(userController.authenticateUser);

controller.route('/getUserByToken')
    .post(userController.getUserByToken);

controller.route('/getAllUsers')
    .get(userController.getAllUsers);

controller.route('/updateUser')
    .post(userController.editUser);
/** </User route> */

/** <Events route> */
controller.route('/getEvents')
    .get(eventController.getEvents);

controller.route('/getEventsByLocation/:latitude/:longitude/:radius')
    .get(eventController.getEventsByLocation);

controller.route('/getEventsByTag/:tagName')
    .get(eventController.getEventsByTag);

controller.route('/deleteEvents')
    .get(eventController.deleteEvents);

controller.route('/createEvent')
    .post(eventController.createEvent);
/** </Events route> */

/** <Messages route> */
controller.route('/getMessages')
    .get(messageController.getMessages);

controller.route('/getMessage/:eventId')
    .get(messageController.getMessageByEvent);

controller.route('/getMessagesWithOwners/:eventId')
    .get(messageController.getMessagesAndUsersByEvent);

controller.route('/createMessage')
    .post(messageController.createMessage);
/** </Messages route> */

/** <Responses route> */
controller.route('/getResponses')
    .get(responseController.getResponses);

controller.route('/getResponse/:messageId')
    .get(responseController.getResponseByMessage);

controller.route('/createResponse')
    .post(responseController.createResponse);
/** </Responses route> */

/** <Images route> */
controller.route('/uploadImage')
    .post(imageController.uploadImage);

controller.route('/getImage')
    .get(imageController.getImage);

controller.route('/getThumbnail')
    .get(imageController.getThumbnail);
/** </Images route> */


/** Start server */
app.listen(config.port, function () {
    console.log("*** Server Running on " + config.port);
});