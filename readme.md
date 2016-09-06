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
    "tagList"     : [String]
}
```
#### Messages
```
{
    "idEvent"     : String,
    "body"        : String  
}
```
#### Users
```
{
    "name"        : String,
    "email"       : String,
    "password"    : String,
    "gcm_token"   : String
}
```

## EndPoints

Please note that the POST services requires a valid token from an authenticated user

### Events resources
  - [GET /getEvents](#get-getevents)
  - [GET /getEventsByLocation/[latitude]/[longitude]/[radius]](#get-geteventsbylocationlatitudelongituderadius)
  - [GET /getEventsByTag/[tag]](#get-geteventsbytagtagname)
  - [POST /createEvent](#post-createevent)

  
#### GET /getEvents 
Gets all events stored in the database.

Example: localhost:8585/api/getEvents

Response body:
``` 
  {
    "_id": "5785668eb15c5cbf67d58039",
    "name": "Epcc",
    "latitude": 39.479367,
    "longitude": -6.3425695,
    "radius": 100,
    "owner": "57854dedd3a99242574f0a26",
    "gcmTokenList": [APA91bHPRgkF3JUikC4ENAHEeMrd41Zxv3hVZjC9KtT8OvPVGJ-hQMRKRrZuJAEcl7B338qju59zJMjw2DELjzEvxwYv7hH5Ynpc1ODQ0aT4U4OFEeco8ohsN5PjL1iC2dNtk2BAokeMCg2ZXKqpc8FXKmhX94kIxQ],
    "tagList": [
      "School of technology",
      "Dragon Hunters"
    ],
    "date": "2016-07-12T21:52:14.447Z"
  }
  ```
#### GET /getEventsByLocation/[latitude]/[longitude]/[radius]
Gets all the events that are inside the [radius] of a certain [longitude] and [latitude].

Example: localhost:8585/api/getEventsByLocation/39.479000/-6.3420000/100

Response body:
``` 
  {
    "_id": "5785668eb15c5cbf67d58039",
    "name": "Epcc",
    "latitude": 39.479367,
    "longitude": -6.3425695,
    "radius": 100,
    "owner": "57854dedd3a99242574f0a26",
    "gcmTokenList": [APA91bHPRgkF3JUikC4ENAHEeMrd41Zxv3hVZjC9KtT8OvPVGJ-hQMRKRrZuJAEcl7B338qju59zJMjw2DELjzEvxwYv7hH5Ynpc1ODQ0aT4U4OFEeco8ohsN5PjL1iC2dNtk2BAokeMCg2ZXKqpc8FXKmhX94kIxQ],
    "tagList": [
      "School of technology",
      "Dragon Hunters"
    ],
    "date": "2016-07-12T21:52:14.447Z"
  }
  ```

#### GET /getEventsByTag/[tagName]
 Gets all the events that contains [tagName].
 
 Example: localhost:8585/api/getEventsByTag/Dragon Hunters
 
 Response body:
 ``` 
   {
     "_id": "5785668eb15c5cbf67d58039",
     "name": "Epcc",
     "latitude": 39.479367,
     "longitude": -6.3425695,
     "radius": 100,
     "owner": "57854dedd3a99242574f0a26",
     "gcmTokenList": [APA91bHPRgkF3JUikC4ENAHEeMrd41Zxv3hVZjC9KtT8OvPVGJ-hQMRKRrZuJAEcl7B338qju59zJMjw2DELjzEvxwYv7hH5Ynpc1ODQ0aT4U4OFEeco8ohsN5PjL1iC2dNtk2BAokeMCg2ZXKqpc8FXKmhX94kIxQ],
     "tagList": [
       "School of technology",
       "Dragon Hunters"
     ],
     "date": "2016-07-12T21:52:14.447Z"
   }
   ```
 
#### POST /createEvent
 Add a new Event to mongoDB.
 
 Example: localhost:8585/api/createEvent (remember to always add a valid token in the headers)
 
 Request body:
 ```
 {
     "name"              : "DevFest",
     "latitude"          : 39.480281,
     "longitude"         : -6.375719,
     "radius"            : 100,
     "tagList"           : ["Node", "Software", "Rock and Roll"]
 }
 ```
  
### Messages resources
  - [GET /getMessages](#get-getmessages)
  - [GET /getMessage/[eventId]](#get-getmessageeventid)
  - [GET /getMessagesWithOwners/[eventId]](#get-getmessagewithownerseventid)
  - [POST /createMessage](#post-createmessage)
  
#### GET /getMessages 
Gets all messages stored in the database.

Example: localhost:8585/api/getMessages

Response body:
```
     "_id": "5787f7e25b29a6e67d0f58e9",
     "idEvent": "57247d3656db4ee139f641e7",
     "idOwner": "57854dedd3a99242574f0a26",
     "likes": 0,
     "body": "This is a test message to the event with id: 57247d3656db4ee139f641e7",
     "date": "2016-07-14T20:36:50.371Z"
     }        
  ```
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