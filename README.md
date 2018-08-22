## StackOverflow-lite  [![Build Status](https://travis-ci.org/Steelze/StackOverflow-lite.svg?branch=develop-api)](https://travis-ci.org/Steelze/StackOverflow-lite)   [![Coverage Status](https://coveralls.io/repos/github/Steelze/StackOverflow-lite/badge.svg?branch=develop-api)](https://coveralls.io/github/Steelze/StackOverflow-lite?branch=develop-api)

# Description
StackOverflow-lite is a platform where people can ask questions and provide answers.

## Built With
* [Node.js](https://nodejs.org/dist/latest-v10.x/docs/api/)

## Documentation
Option | Default | Meaning
--- | --- | ---
`GET` | `/api/v1/questions` | "Fetches all question."
`POST` | `/api/v1/questions` | "Adds a question."
`GET` | `/api/v1/questions/{id}` | Fetch a selected question.
`PUT` | `/api/v1/questions/{id}` | Updates a selected question.
`DELETE` | `/api/v1/questions/{id}` | Deletes a selected question.
`POST` | `/api/v1/questions/{id}/answers` | Adds an answer for a selected question

## Setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Dependencies

* node.js

### Getting Started
Download and install node.js
Open terminal and run the following comands
```
$ git clone https://github.com/Steelze/StackOverflow-lite.git
$ cd stackoverflow-lite
$ git checkout develop-api
$ npm install
```

### Run The Service
```
$ node dist/app
```

### Testing
Open up the terminal and type in the command
```
$ npm test
```
If correctly setup, all tests should pass

## Deployment

The application is hosted on heroku 
https://stackoverflow-lite-5000.herokuapp.com/api/v1/questions

## License

MIT © Ogungbure Odunayo
