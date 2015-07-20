import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN)
GPIO.setup(27, GPIO.IN)
GPIO.setup(22, GPIO.IN)
GPIO.setup(23, GPIO.IN)
GPIO.setup(24, GPIO.IN)
while True:
	input_stateCapture1 = GPIO.input(17)
	input_stateCapture2 = GPIO.input(27)
	input_stateCapture3 = GPIO.input(22)
	input_stateCapture4 = GPIO.input(23)
	input_stateCapture5 = GPIO.input(24)
	time.sleep(1)
	if input_stateCapture1 == True:
		print('Pin1 Pressed')
	if input_stateCapture2 == True:
		print('Pin2 Pressed')
	if input_stateCapture3 == True:
		print('Pin3 Pressed')
	if input_stateCapture4 == True:
		print('Pin4 Pressed')
	if input_stateCapture5 == True:
		print('Pin5 Pressed')
	
