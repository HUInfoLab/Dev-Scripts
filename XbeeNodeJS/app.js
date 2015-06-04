var util = require('util');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var fs = require('fs');
var C = xbee_api.constants;
var liner = require('liner');


/*
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});

var serialport = new SerialPort("/dev/ttyAMA0", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
}); 
*/


// config files
var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url); // connect to our database


//setup database variables
var sunlightSchema = mongoose.Schema({
    SensorID: String,
    SensorVal: String
})
var myvalue = mongoose.model('myvalue', sunlightSchema) 


//read file line by line
var liner = new liner('./data/test.txt');
liner.on('readable', function () {
    while (true) {
        var fileContents = liner.read();
		if (fileContents === null) break;
        
        //parse contents
        var dataArray = fileContents.split(" ");
        var id = dataArray[0];
        var data = dataArray[1];

        //Write to DB
        var dataWrite = new myvalue({ SensorID: id, SensorVal: data })
        dataWrite.save(function (err, dataWrite) {
            if (err) return console.error(err);
        });
    }
});
	

liner.on('error', function (err) {
    console.error(err);
});

//prevents from writing to database for some reason
//liner.on('end', function () {
//    process.exit(0);
//});


//Read from DB
var x = 0;
myvalue.find(function (err, myvalue) {
    if (err) return console.error(err);
    while (x<5) {   //need to improve iteration condition
        console.log(myvalue[x].SensorID);
        console.log(myvalue[x].SensorVal);
        x++
    };
}) 




/*
serialport.on("open", function () {
    
    fs.readFile('./data/test.txt', function (err,data) {
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
    //Read from DB and display to file
      
});
*/

/*
serialport.on('data', function (data) {
    console.log('data received: ' + data);
});


// All frames parsed by the XBee will be emitted here
xbeeAPI.on("frame_object", function (frame) {
    console.log(">>", frame);
});
*/