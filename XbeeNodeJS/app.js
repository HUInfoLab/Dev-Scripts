var util = require('util');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var fs = require('fs');
var C = xbee_api.constants;
var liner = require('liner');
//new setup files
var mongoose = require('mongoose');
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//config
var database = require('./config/database');
mongoose.connect(database.url); // connect to our database

app.use(express.static(__dirname + '/public')); // set the static files location /public/img
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse app/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node app)
app.listen(8080);
console.log("App listening on port 8080");

//setup database variables
var myvalue = mongoose.model('myvalue', { 
    SensorID: String,
    SensorVal: String
}); 




/*
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});

var serialport = new SerialPort("/dev/ttyAMA0", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
}); 
*/


/*
Automatically restart server when files change: By default, node will not monitor for file changes after your server has been started. This means you’d have to shut down and start the server every time you made a file change. This can be fixed with nodemon. To use: install nodemon globally npm install -g nodemon. Start your server with nodemon server.js now. Smooth sailing from there.
*/


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
app.get('/api/myvalues', function(req, res) { //print values to webpage
    myvalue.find(function (err, myvalues) {
        if (err) res.send(err);
        //print values to console
        while (x<5) {   //need to improve iteration condition
            console.log("#" + (x+1) + " = " + myvalues[x].SensorID + ", " + myvalues[x].SensorVal);
            x++
        };
        res.json(myvalues); // return all myvalues in JSON format
    });
});    

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

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