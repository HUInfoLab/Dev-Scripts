/*
  Arduino Mothership Communication Link

 An example of using the Arduino board to receive data from the
 computer.  In this case, the Arduino boards turns on an LED when
 it receives the character 'H', and turns off the LED when it
 receives the character 'L'.

 The data can be sent from the Arduino serial monitor, or another
 program like Processing (see code below), Flash (via a serial-net
 proxy), PD, or Max/MSP.

 The circuit:
 * LED connected from digital pin 13 to ground

 created 2006
 by David A. Mellis
 modified 30 Aug 2011
 by Tom Igoe and Scott Fitzgerald
 modified 27 May 2015


 */

#include <Wire.h>


#define DAUGHTER_ADDRESS 0x05

const int ledPin = 13; // the pin that the LED is attached to
int incomingByte;      // a variable to read incoming serial data into
int number = 0;

void setup() {
  // initialize serial communication:
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  
  Wire.begin(DAUGHTER_ADDRESS);
    
  // define callbacks for i2c communication
  Wire.onReceive(receiveData);
  Wire.onRequest(sendData);
  
}

void loop() {
  // see if there's incoming serial data:
//  if (Serial.available() > 0) {
//    // read the oldest byte in the serial buffer:
//      incomingByte = Serial.read();
//    // if it's a capital H (ASCII 72), turn on the LED:
//    if (incomingByte == 'H') {
//      digitalWrite(ledPin, HIGH);
//    }
//    // if it's an L (ASCII 76) turn off the LED:
//    else if (incomingByte == 'L') {
//     digitalWrite(ledPin, LOW);
//    } else {
//      sendData();
//    }    
//  }
}


// callback for received data
void receiveData(int byteCount){

    while(Wire.available()) {
        number = Wire.read();
      //firstSensor = analogRead(A0);
       // number = firstSensor;
        Serial.print("data received: ");        
        Serial.println(number);       
     }
}

// callback for sending data
void sendData(){
    
      if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
      incomingByte = Serial.read();
      char data = char(incomingByte);
      Wire.write(data);
    // if it's a capital H (ASCII 72), turn on the LED:
    if (incomingByte == 'H') {
      digitalWrite(ledPin, HIGH);
    }
    // if it's an L (ASCII 76) turn off the LED:
    else if (incomingByte == 'L') {
     digitalWrite(ledPin, LOW);
    } 
  }
  }

