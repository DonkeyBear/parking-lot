import requests
from os import path as osPath
from time import sleep

# get absolute dir this script is in
dirHere = osPath.dirname(__file__)

# set separator for different os
if "/" in dirHere:
    dir_separator = "/"
else:
    dir_separator = "\\"

parking_lot_api = "https://iot-parking-lot.herokuapp.com/api"
last_sensor = ""

while True:
    with open(dirHere + dir_separator + "sensor.txt", "r") as sensor_file:
        latest_sensor = sensor_file.read().splitlines()[-1]

    if latest_sensor != last_sensor:
        last_sensor = latest_sensor
        requests.post(parking_lot_api, params={"token": "PASS", "sensor": latest_sensor})

    print(latest_sensor)
    sleep(1.5)