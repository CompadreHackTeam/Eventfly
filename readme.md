# Eventfly API

Eventfly API is a service created in Node.js using MongoDB that offers chat based on 'geofences'. 

The project was born in the "Hack for Good 2016" event in the Escuela Politécnica (Extremadura University), after that we decided to go on with that forming the "Compadre Hack Team" as a learning and personal growing project.

## EndPoints

Please note that the POST services requires a valid token from an authenticated user

#### Events
    
- **/getEvents** Gets all events stored in the database.
- **/getEventsByLocation/:latitude/:longitude/:radius** Gets all the events that are inside the _radius_ of a certain _longitude_ and _latitude_.
- **/getEventsByTag/:tagName** Gets all the events that contains _tagName_. 
- **/createEvent** Add a new Event to mongoDB.

#### Messages

- **/getMessages** Gets all messages stored in the database.
- **/getMessage/:eventId** Gets all messages that belongs to the _eventId_ event.
- **/getMessagesWithOwners/:eventId'** Gets all messages and users that posted them that belongs to the _eventId_ event.
- **/createMessage** Adds a new Message to mongoDB.

#### Users

- **/registerUser** Adds a new User to mongoDB.
- **/authenticateUser** Returns the token of the User authenticated.
- **/getUserByToken** Gets User data from your token.
- **/updateUser** Updates the user data.

#### Images

- **/uploadImage** Adds an image to mongoDB.
- **/getImage/:id** Gets the image corresponding to the _id_.
- **/getThumbnail/:id** Gets the thumbnail image corresponding to the _id_.


## Tech

Eventfly uses a number of open source projects to work properly:

* [node.js] - Evented I/O for the backend
* [Express] - Fast node.js network app framework 
* [MongoDB] - High performance noSQL DB
* [JsonWebToken] - JSON-based open standard (RFC 7519) for creating tokens

## Installation

Eventfly requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest release](https://github.com/CompadreHackTeam/Eventfly).

Install the dependencies and start the server using node.

```sh
$ cd Eventfly
$ npm install 
$ node app.js
```

License
----

GPL

**Free Software, Hell Yeah!**