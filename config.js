// config.js

var config = {};

config.displayModule = {
  module: './display_modules/lk202-25',
  config: {
    title: '      OpenAPS'
  }
};

config.socketServer = {
  socketPath: './display.sock'
};


module.exports = config;
