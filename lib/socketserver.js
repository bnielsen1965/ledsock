// socketServer.js

/*jshint esversion: 6*/

/**
 * Listen for JSON messages on a Unix socket and emit command
 * message when a JSON message is a command.
 */

const net = require('net');
const fs = require('fs');
const extend = require('extend');

module.exports = function (config) {
  var socketServer = {
    server: null,
    defaults: {
      socketPath: './socketServer.sock'
    },
    config: null,

    init: function (config) {
      socketServer.config = extend(true, socketServer.defaults, config);
      socketServer.server = net.createServer(socketServer.onConnect)
      .on('error', socketServer.createError)
      .listen(socketServer.config.socketPath);
    },

    closeServer: function () {
      if (fs.existsSync(socketServer.config.socketPath)) {
        fs.unlinkSync(socketServer.config.socketPath);
      }
      if (socketServer.server) {
        socketServer.server.close();
      }
    },

    createError: function (e) {
      switch (e.code) {
        case 'EADDRINUSE':
        // attempt to recover if abandoned unix socket
        var clientSocket = new net.Socket();
        clientSocket
        .on('error', function (e) {
          if (e.code == 'ECONNREFUSED') {
            fs.unlinkSync(socketServer.config.socketPath);
            socketServer.server.listen(socketServer.config.socketPath, function() {
              console.log('server recovered');
            });
          }
        })
        .connect({path: socketServer.config.socketPath}, function() {
          throw new Error('Server running, giving up...');
        });
        break;

        default:
        throw e;
      }
    },

    onConnect: function (client) {
      client
      .on('end', function () {})
      .on('data', socketServer.processclientData.bind(null, client));

    },

    processclientData: function (client, buffer) {
      var msg = buffer.toString();
      var cmd = null;
      try {
        console.log('MSG', msg)
        cmd = JSON.parse(msg);
      }
      catch (e) {
        client.write('401 JSON parse error\n\n');
        return;
      }

      if (!cmd || !cmd.command) {
        client.write('402 Missing command\n\n');
        return;
      }

      client.write('0 Command received\n\n');
      socketServer.config.emitter.emit('command', cmd);
    }
  };

  socketServer.init(config);
  return socketServer;
};
