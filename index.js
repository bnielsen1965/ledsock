// index.js

/*jshint esversion: 6*/

/**
 *
 */

// create the display module that will accept commands
// or should this come after create the server and then pass the emitter to the display module?
var dmConfig = require('./config').displayModule;
var displayModule = require(dmConfig.module)(dmConfig.config);

// create the display server which provides an emitter where commands are emitted
var commandEmitter = require('./lib/server')(require('./config').socketServer);

var commandProcessor = require('./lib/commandprocessor')(displayModule, commandEmitter, {});

/*
commandEmitter.on('command', function (cmd) {
  console.log('CMD: ', cmd)
});
*/
