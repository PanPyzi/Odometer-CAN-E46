import json
import time
def read():
    data = {
        "SPEED": 299,
        "RPM": 0,
        "WATER": 100,
        "OIL": 121,
        "RIGHT": "gray",
        "LEFT": "gray",
    }
    while True:
        for i in range(100,7000,56):
            data["RIGHT"] = "gray"
            data["LEFT"] = "gray"
            time.sleep(0.1)
            data["RPM"] = i
            #data["WATER"]=(i/100)*2
            if(i%5==0):
                data["RIGHT"]="green"
                data["LEFT"]="green"
            print(json.dumps(data))

read()