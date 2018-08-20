[![Build Status](https://travis-ci.org/Steelze/StackOverflow-lite.svg?branch=develop-api)](https://travis-ci.org/Steelze/StackOverflow-lite)
[![Coverage Status](https://coveralls.io/repos/github/Steelze/StackOverflow-lite/badge.svg?branch=develop-api)](https://coveralls.io/github/Steelze/StackOverflow-lite?branch=develop-api)

# StackOverflow-lite
StackOverflow-lite is a platform where people can ask questions and provide answers.

## Built With
* [Node.js](https://nodejs.org/dist/latest-v10.x/docs/api/)
* [Express.js](http://expressjs.com/en/4x/api.html/)

## Demo
https://stackoverflow-lite-5000.herokuapp.com/api/v1/questions

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
```
$ git clone https://github.com/Steelze/StackOverflow-lite.git
$ cd stackoverflow-lite
$ git checkout develop-api
$ npm install
```
start application
```
$ node dist/app
```

## API Reference
`GET` /api/v1/questions <br>
-Fetches all question

`GET` /api/v1/questions/{id} <br>
-Fetch a selected question

`POST` /api/v1/questions <br>
-Adds a question

`PUT` /api/v1/questions/{id} <br>
-Updates a selected question

`DELETE` /api/v1/questions/{id} <br>
-Deletes a selected question

`POST` /api/v1/questions/{id}/answers <br>
-Adds an answer for a selected question

### Running tests
Explain how to run the automated tests for this system
```
$ npm test
```

## License

MIT © Ogungbure Odunayo
