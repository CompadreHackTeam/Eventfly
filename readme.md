# Eventfly API

Eventfly API is a service created in Node.js using MongoDB that offers chat based on 'geofences'. 

The project was born in the "Hack for Good 2016" event in the Escuela Politécnica (Extremadura University), after that we decided to go on with that forming the "Compadre Hack Team" as a learning and personal growing project.

## Models

#### Events
```
{
    "name"        : String,
    "latitude"    : Number,
    "longitude"   : Number,
    "radius"      : Number,
    "tagList"        : [String]
}
```
#### Messages
```
{
    "idEvent"       : String,
    "body"          : String  
}
```
#### Users
```
{
    "name" : String,
    "email": String,
    "password" : String,
    "gcm_token" : String
}
```

## EndPoints

Please note that the POST services requires a valid token from an authenticated user

#### Events
    
- **GET /getEvents** Gets all events stored in the database.
- **GET /getEventsByLocation/[latitude]/[longitude]/[radius]** Gets all the events that are inside the [radius] of a certain [longitude] and [latitude].
- **GET /getEventsByTag/[tagName]** Gets all the events that contains [tagName]. 
- **POST /createEvent** Add a new Event to mongoDB.

#### Messages

- **GET /getMessages** Gets all messages stored in the database.
- **GET /getMessage/[eventId]** Gets all messages that belongs to the [eventId] event.
- **GET /getMessagesWithOwners/[eventId]** Gets all messages and users that posted them that belongs to the [eventId] event.
- **GET /createMessage** Adds a new Message to mongoDB.

#### Users

- **GET /getUserByToken** Gets User data from your token.
- **POST /registerUser** Adds a new User to mongoDB.
- **POST /authenticateUser** Returns the token of the User authenticated.
- **POST /updateUser** Updates the user data.

#### Images

- **GET /getImage/[id]** Gets the image corresponding to the [id].
- **GET /getThumbnail/[id]** Gets the thumbnail image corresponding to the [id].
- **POST /uploadImage** Adds an image to mongoDB.

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