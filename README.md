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

## Raspberry Pi Service
Assuming the display server will be running on a Raspbery Pi with the Raspbian OS, the ledsock package can be configured as a system service.
