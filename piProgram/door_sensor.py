import RPi.GPIO as GPIO
import requests
import time

GPIO.setmode(GPIO.BCM)
door_pin = 18
GPIO.setup(door_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)


door_flag = 0
while True :
    try:
        door_open = GPIO.input(door_pin)

        if door_open == 0 and door_flag == 0:
            #print ("1")
      	    continue
        elif door_open == 1 and door_flag == 0:
            print ("2-Door Open")
            payload = {'value': True}
            r = requests.post("http://172.46.0.205:4000/api/door",data=payload)
            door_flag = 1
        elif door_open == 0 and door_flag ==1:
            #print ("3")
            door_flag = 0
        else:
            #print ("4")
            continue
    except:
        continue
       
        