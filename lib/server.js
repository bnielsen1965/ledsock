// server.js

/*jshint esversion: 6*/

const events = require('events');
const extend = require('extend');

module.exports = function (config) {
  // create an event emitter to be used by the socketServer when commands are received
  var emitter = new events.EventEmitter();

  // create the socketServer with any custom config settings and our emitter
  var ss = require('./socketserver')(extend(config, {emitter: emitter}));

  // handle any exit events in the server process
  process
  .on('exit', exitHandler)
  .on('SIGINT', exitHandler)
  .on('uncaughtException', exitHandler);

  function exitHandler (err) {
    ss.closeServer();
    if (err) {
      console.log(err);
    }
  }

  return emitter;
};
