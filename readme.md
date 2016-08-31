# Eventfly API

Eventfly API is a service created in Node.js using MongoDB that offers chat based on 'geofences'. 

The project was born in the "Hack for Good 2015" event in the Escuela Politécnica (Extremadura University), after that we decided to go on with that forming the "Compadre Hack Team", wich is composed by Alberto de la Fuente and Ricardo Flores Rosco as a learning and personal growing project.

## EndPoints

Please note that the POST services requires a valid token from an authenticated user

### Events
    
- **/getEvents** Gets all events stored in the database.
- **/getEventsByLocation/:latitude/:longitude/:radius** Gets all the events that are inside the _radius_ of a certain _longitude_ and _latitude_.
- **/getEventsByTag/:tagName** Gets all the events that contains _tagName_. 
- **/createEvent** Post a new Event to mongoDB.

## Tech

Eventfly uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [MongoDB] - High performance noSQL DB
* [JsonWebToken] - JSON-based open standard (RFC 7519) for creating tokens

## Installation

Eventfly requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest release](https://github.com/CompadreHackTeam/Eventfly).

Install the dependencies and and start the server using pm2.

```sh
$ cd Eventfly
$ npm install 
$ pm2 start app.js
```

License
----

GPL

**Free Software, Hell Yeah!**