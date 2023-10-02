import json
import time
def read():
    data = {
        "SPEED": 299,
        "RPM": 0,
        "WATER": 90,
        "OIL": 99,
    }
    while True:
        for i in range(100,7000,50):
            time.sleep(0.1)
            data["RPM"] = i
            print(json.dumps(data))

read()