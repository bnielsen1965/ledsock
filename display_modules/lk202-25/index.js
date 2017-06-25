
// LK202-25 i2c display module driver

/*jshint esversion: 6*/

const i2c = require('i2c');
const extend = require('extend');

module.exports = function(config) {
    var Display = {
      config: null,
      wire: null,
      error: '',
      default: {
        address: 0x28,
        lines: 2,
        characters: 20,
        device: '/dev/i2c-1',
        title: ''//Display.centerString('LK202-25')//\n Display Module'
      },

      init: function (config) {
        Display.config = extend(Display.default, config);
        Display.config.padding = Array(Display.config.characters).join(' ');
        if (!Display.config.title) {
          Display.config.title = Display.centerString('LK202-25') + '\n' + Display.centerString('Display Module');
        }
        Display.wire = new i2c(Display.config.address, {device: Display.config.devicde});
        Display.clear(Display.config.title);
      },

      clear: function (str) {
        try {
          Display.wire.write([0xFE, 0x58], function (err) {
            if (err) {
              Display.error = err;
            }
            else if (str) {
              Display.write(str);
            }
          });
        }
        catch (e) {
          Display.error = e.toString();
        }
      },

      write: function (str) {
        try {
          Display.wire.write(str, function (err) {
            if (err) {
              Display.error = err;
            }
          });
        }
        catch (e) {
          Display.error = e.toString();
        }
      },

      centerString: function (str) {
        if (str.length < Display.config.characters) {
          return Display.config.padding.slice(-1 * Math.round((Display.config.characters - str.length) / 2)) + str;
        }
        else {
          var s = Math.floor((str.length - Display.config.characters) / 2);
          return str.slice(s, s + Display.config.characters);
        }
      }
    };

    Display.init(config);
    return Display;
};
