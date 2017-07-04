#!/bin/bash

# takes a file or stdin and uses as the message string in the write command JSON
# sent to a display server unix socket
#
# usage: write.sh socket [file]
#
# i.e.
# echo "Hello World" | write.sh ../display.sock

[ $# -lt 1 ] && { echo "Must specify display server socket."; exit 1; }

# determine where to get input, file parameter or stdin
[ $# -ge 2 -a -f "$2" ] && input="$2" || input="-"

# convert input into command message
str=`cat $input`

IFS=
cmd="{\"command\":\"write\",\"string\":\"${str//\"/\\\"}\"}"
unset IFS

# send command to socket
echo "$cmd" | socat - $1
