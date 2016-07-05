/**
 * Author : Alberto de la Fuente Cruz
 *
 * Database manager
 */
var mongoose    = require('mongoose');
var config      = require('../Eventfly.properties');

module.exports = {
    connectDB: function () {
        // Create the database connection
        mongoose.connect(config.mongodburi);

        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connection.on('connected', function () {
            console.log('*** Connected to MongoDB on ' + config.mongodburi);
        });

        // If the connection throws an error
        mongoose.connection.on('error', function (err) {
            console.log('*** Error connecting to MongoDB, ¿ Is the Mongo Daemon running ? (tip: $ps aux | grep mongod ), ERROR : ' + err);
        });
    }
};
