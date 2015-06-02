## Synopsis

A rudimentary piece of source code to have two Xbee's talk to eachother. One Xbee chip connected to a Raspberry Pi, where this server code will run, and one Xbee chip connected to your computer.

## Circuit Connection

Below is a circuit diagram for your raspberry pi and Xbee connection.

![alt text][circuit]


## Installation

1. Install node.js on the Raspberry Pi
2. Download the project folder to the Raspberry Pi
3. Open up your Raspberry Pi terminal and navigate to the folder in which you've downloaded the code to
4. execute command **npm install** to install dependency libraries 
5. Install X-CTU software on computer 
6. Open X-CTU and connect to the Xbee console tab
7. Go back to the Raspberry Pi and execute the command **node app** in the terminal where you had previous done **npm install**
8. In the console tab on your computer you should see the read out from the test.txt file

## API Reference

1. xbee-api
2. serialport

## Tests

TBD

## Contributors

Thank you for the tutorial and circuit diagram provided by [Sony Arouje](http://sonyarouje.com/2014/12/20/connecting-xbee-to-raspberry-pi/) 

Trey Morris and David Nessbeth of Howard Electrical and Computer Engineering Department have aggregated this code to use in your project.

## License

MIT License rights

[circuit]: http://sonyarouje.files.wordpress.com/2014/12/connection_diagram_bb_thumb.jpg?w=605&h=480 "Circuit Diagram" 