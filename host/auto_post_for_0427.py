import requests
from os import path as osPath
from time import sleep
from datetime import datetime

# get absolute dir this script is in
dirHere = osPath.dirname(__file__)

# set separator for different os
if "/" in dirHere:
    dir_separator = "/"
else:
    dir_separator = "\\"

parking_lot_api = "https://iot-parking-lot.herokuapp.com/api"
sensor_length = 20
last_sensor = ""

while True:
    with open(dirHere + dir_separator + "sensor.txt", "r") as sensor_file:
        temp_lastline = sensor_file.read().splitlines()[-1]
        if len(temp_lastline) < sensor_length:
            sleep(0.1)
            continue
        # latest_sensor = sensor_file.read().splitlines()[-1]
        latest_sensor = str(11111111111111111111 - int(temp_lastline))
        while len(latest_sensor) < sensor_length:
            latest_sensor = "0" + latest_sensor

    now = datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
            
    if latest_sensor != last_sensor:
        if len(latest_sensor) == sensor_length:
            last_sensor = latest_sensor
            requests.post(parking_lot_api, params={"token": "PASS", "sensor": latest_sensor})
            print("[{}] Post: {}".format(date_time, latest_sensor))
        else:
            print("[{}] Error: insufficient {} digit({}).".format(date_time, sensor_length, latest_sensor))
    else:
        print("[{}] Unpost: Same as the content lastest post.".format(date_time))

    sleep(1)
