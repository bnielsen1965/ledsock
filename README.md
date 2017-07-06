# ledsock
A socket server used to control an OLED display by
accepting JSON based commands through a Unix socket.

The ledsock package provides the socket server to
process commands while a display module driver that
provides the hardware integration must be installed
with the ledsock package.


## install
First install nodejs.

Clone the repository...
> git clone https://github.com/bnielsen1965/ledsock.git

Install the proper ledsock display module for your hardware, I.E. ...
> cd ledsock
> npm install --production --save git+https://github.com/bnielsen1965/ledsock-dm-ssd1306.git

Edit the config.js file and change the config.displayModule settings to match the requirements for the installed display module.

Install dependencies...
> npm install --production

Start the ledsock server...
> node index.js

Test with example bash script that uses socat...
> cd ledsock/examples/
> echo "   Hello World   " | ./write.sh ../display.socket

Example command should return with ledsock response...
> 0 Command received


## Socket API
A Unix socket named display.sock is opened in the working directory where the ledsock service is running. JSON messages can be passed to this socket using socat or some other method. The messages should include commands and parameters as outlined below.

The service will respond to messages with a simple string message that starts with a return code and a response message. The return code will be 0 if there were no errors or and positive integer if an problem was encountered. I.E.
> 0 Command received

Or in the case of an error...

> 401 JSON parse error


### clear
The clear command is used to clear the display and set the cursor home position to the first line in the display.

```JSON
{
  "command": "clear"
}
```


### home
Homing the cursor to the start of a line on the display. The command can optionally include a line number for a specific line on the display.

I.E. basic home...
```JSON
{
  "command": "home"
}
```

I.E. home to line 2 on the display...
```JSON
{
  "command": "home",
  "line": 2
}
```


### write
Strings of text are written to the display with the write command. Text will start at the current cursor position and will follow the wrap settings of the display module driver.

```JSON
{
  "command": "write",
  "string": "Hello World"
}
```

## example
Some example bash scripts and JSON are included in the example directory. These examples demonstrate how to create bash scripts that pass JSON to the ledsock server through the Unix socket created by the server.

### write.sh
The write bash script is used to send a write command to the server. The first argument to the script is the file path for the Unix socket and text can be passed via stdin or by specifying a file as the second argument.

> echo "Hello World" | ./write.sh ../display.sock


### writejson.sh
A complete JSON message can be sent to the server using the wrotejson.sh bash script. The first arguemnt to this script is the path to the Unix socket while the JSON message can be passed via stdin or as a file in the second argument.

> ./writejson.sh ../display.sock clear.json


## Raspberry Pi Service
Assuming the display server will be running on a Raspbery Pi with the Raspbian OS, the ledsock package can be configured as a system service.

### systemd
An example systemd service file is included in the project etc/systemd/system/ directory. Modify this service file as needed to work with your system configuration.
