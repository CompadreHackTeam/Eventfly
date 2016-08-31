# Eventfly API

Eventfly API is a service created in Node.js using MongoDB that offers chat based on 'geofences'. 

The project was born in the "Hack for Good 2015" event in the Escuela Politécnica (Extremadura University), after that we decided to go on with that forming the "Compadre Hack Team", wich is composed by Alberto de la Fuente and Ricardo Flores Rosco as a learning and personal growing project.

### Tech

Eventfly uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [MongoDB] - High performance noSQL DB

### Installation

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