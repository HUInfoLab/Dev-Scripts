var util = require('util');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var fs = require('fs');
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});

var serialport = new SerialPort("/dev/ttyAMA0", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
});

serialport.on("open", function () {
    fs.readFile('test.txt', function (err,data) {
	var frame_obj = {
        	type: 0x10, 
        	id: 0x01, 
       		//destination64: "0013A200407A25B5",
        	broadcastRadius: 0x00,
        	options: 0x00, 
        	data: data
        };

	serialport.write(xbeeAPI.buildFrame(frame_obj));
        console.log('Sent to serial port the following data: ' + data);
     });	
	
    
    
});

serialport.on('data', function (data) {
    console.log('data received: ' + data);
});


// All frames parsed by the XBee will be emitted here
xbeeAPI.on("frame_object", function (frame) {
    console.log(">>", frame);
});