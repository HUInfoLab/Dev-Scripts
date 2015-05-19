#include <Wire.h>

#define DAUGHTER_ADDRESS 0x05
int number = 0;
int state = 0;

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
    delay(100);
    Serial.print('H');
    delay(1000);
    Serial.print('L');
    delay(1000);
}

// callback for received data
void receiveData(int byteCount){

    while(Wire.available()) {
        number = Wire.read();
        Serial.print("data received: ");
        Serial.println(number);

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
    Wire.write(number);
}

