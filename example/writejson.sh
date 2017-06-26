#!/bin/bash

# takes a file or stdin and uses as a JSON message string in the write command
# sent to a display server unix socket
#
# usage: writejson.sh socket [file]
#
# i.e.
# echo "{\"command\":\"clear\"}" | writejson.sh ../display.sock

[ $# -lt 1 ] && { echo "Must specify display server socket."; exit 1; }

# determine where to get input, file parameter or stdin
[ $# -ge 2 -a -f "$2" ] && input="$2" || input="-"

# convert input into message
str=`cat $input`

# send string to socket
echo $str | socat - $1
