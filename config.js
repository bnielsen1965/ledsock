// config.js

var config = {};

config.displayModule = {
  module: '[ REPLACE THIS WITH YOUR INSTALLED MODULE I.E. ledsock-dm-ssd1306 ]',
  config: {
    title: 'OpenAPS'
  }
};

config.socketServer = {
  socketPath: './display.sock'
};

module.exports = config;
