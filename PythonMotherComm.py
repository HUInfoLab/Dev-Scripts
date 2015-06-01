import smbus
import time
# for RPI version 1, use "bus = smbus.SMBus(0)"
bus = smbus.SMBus(1)

# This is the address we setup in the Arduino Program
address = 0x05

f = open("test.txt", "wb")



def writeNumber(value):
    bus.write_byte(address, value)
    # bus.write_byte_data(address, 0, value)
    return -1

def readNumber():
    number = bus.read_byte(address)
    # number = bus.read_byte_data(address, 1)
    return number

while True:
    var = input("Enter 1 - 9: ")
    if not var:
        continue

    writeNumber(var)
    print "RPI: Hey favorite can you send me your data"
    # sleep one second
    time.sleep(1)

    try:
        while var == 2 : 
            number = readNumber()    
            print "Arduino: Sure RPI, Here you go: ", number
            print
            f.write('SunlightS: ' + str(number) + '\n')
            time.sleep(2)
    except KeyboardInterrupt:
            f.close()
        
