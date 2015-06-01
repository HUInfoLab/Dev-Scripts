#include <Wire.h>


#define DAUGHTER_ADDRESS 0x05
int number = 0;
int state = 0;
int firstSensor = 0;    // first analog sensor


void setup() {
    pinMode(13, OUTPUT);
    Serial.begin(9600);         // start serial for output
    // initialize i2c as slave
   Wire.begin(DAUGHTER_ADDRESS);
    
    // define callbacks for i2c communication
    Wire.onReceive(receiveData);
    Wire.onRequest(sendData);
    
    Serial.println("Ready!");
   
}

void loop() {
      
      firstSensor = analogRead(A1);      
      int data = firstSensor;
      Serial.print(data, HEX);    
      Serial.flush();
     Serial.print('H');
     delay(1000);
     Serial.print('L');
     delay(1000);
    
  
}

// callback for received data
void receiveData(int byteCount){

    while(Wire.available()) {
        number = Wire.read();
      firstSensor = analogRead(A0);
       number = firstSensor;
        
       

        if (number == 1){

            if (state == 0){
                digitalWrite(13, HIGH); // set the LED on
                state = 1;
            }
            else{
                digitalWrite(13, LOW); // set the LED off
                state = 0;
            }
         }
     }
}

// callback for sending data
void sendData(){
    
//     Serial.print(firstSensor);    
//      delay(1000);
//      Serial.print('H');
//      delay(1000);
//      Serial.print('L');
//      delay(500);
  
    number = analogRead(A1)/5;
    Wire.write(number);
}

