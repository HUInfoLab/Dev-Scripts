var util = require('util');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var fs = require('fs');
var C = xbee_api.constants;


// config files
var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url); // connect to our database


var data = "SunlightTest"; //test value for SensorVal
var id = "TestID"; //test value for SensorID
//fs.readFile('./data/test.txt', "utf-8", function (err, data) {
    //setup database variables
    var sunlightSchema = mongoose.Schema({
        SensorID: String,
        SensorVal: String
    })
    var myvalue = mongoose.model('myvalue', sunlightSchema)
  
    //Write to DB
/*    var dataWrite = new myvalue({ SensorID: id, SensorVal: data })
    dataWrite.save(function (err, dataWrite) {
        if (err) return console.error(err);
    });
 */ 
    //Read from DB
    myvalue.find(function (err, myvalue) {
      if (err) return console.error(err);
      console.log(myvalue[0].SensorID);
    })
    

    
    

//});



/*
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});

var serialport = new SerialPort("/dev/ttyAMA0", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
});


serialport.on("open", function () {
    
    	// var liner = new Liner('test.txt');
	// liner.on('readable', function () {
		// while (true) {
		// var line = liner.read();
		// if (line === null) break;
		//Do something with line.
		// console.log(line);
		// }
	// });
	
	// liner.on('error', function (err) {
		// console.error(err);
	// });

	// liner.on('end', function () {
		// process.exit(0);
	// });
    
    ////////////fs.readFile('./data/test.txt', function (err,data) {
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
	
    
    //Write to DB
    var sunlightSchema = mongoose.Schema({
        xxx: String
    })
    var myvalue = mongoose.model('myvalue', sunlightSchema)
    var dataWrite = new myvalue({ xxx: data })
    dataWrite.save(function (err, dataWrite) {
        if (err) return console.error(err);
    });
    
    
    
    //Read from DB and display to file
    
    myvalue.find(function (err, myvalue) {
        if (err) return console.error(err);
        console.log(myvalue)
        console.log(data)
    })
    
    
});



serialport.on('data', function (data) {
    console.log('data received: ' + data);
});


// All frames parsed by the XBee will be emitted here
xbeeAPI.on("frame_object", function (frame) {
    console.log(">>", frame);
});
*/