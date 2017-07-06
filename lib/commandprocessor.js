
/*jshint esversion: 6*/

module.exports = function (displayModule, commandEmitter, config) {
  var Processor = {
    init: function (config) {
      commandEmitter.on('command', Processor.onCommand);
    },

    onCommand: function (cmd) {
      switch (cmd.command) {
        case 'clear':
        displayModule.clear();
        break;

        case 'write':
        displayModule.write(cmd.string);
        break;

        case 'home':
        displayModule.home(cmd.line);
        break;
      }
    }
  };

  Processor.init(config);
  return Processor;
};
