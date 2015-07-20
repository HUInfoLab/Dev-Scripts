 #!/usr/bin/python
 # coding: utf-8
# import smbus
# import time
# import HumTempDriver

# bus = smbus.SMBus(1)

# # This is the address we setup in the Arduino Program
# address = 0x40
# humAddress = 0xE5

# def writeNumber():
	# bus.write_byte_data(address, humAddress, 3)
	# #bus.write_byte(humAddress)
	# readNumber();
	# # # bus.write_byte_data(address, 0, value)
	# # return -1

# def readNumber():
	# #number = bus.read_byte(address)
	# number = bus.read_byte(address)
	# return number

# while True:
	# var = input("Enter 1 – 9: ")
	# if not var:
		# continue

	
	# print "RPI: Hi Arduino, I sent you ", var
	# # sleep one second
	# time.sleep(1)

	# number = writeNumber()
	# print "Arduino: Hey RPI, I received a digit ", number
	# print
import time
import HTU21DF

while True:
   print("sending reset...")
   HTU21DF.htu_reset
   temperature = HTU21DF.read_temperature()
   print("The temperature is %f C." % temperature)
   time.sleep(1)
   humidity = HTU21DF.read_humidity()
   print("The humidity is %F percent." % humidity)