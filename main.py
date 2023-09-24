from socketcan import CanRawSocket, CanFrame
import json
import threading

#Init important vars


interface = "can0"
socket = CanRawSocket(interface=interface)



def read():
    SPEED_S=0
    THROTTLE_P=0
    RPM_D = 0
    WATER_T = -99
    CHECK_ENG = False
    ssss = ""
    while True:
        frame = socket.recv()
        can_data_B=frame.data
        can_data = []
        for i in range(0, len(frame.data.hex()))[::2]:
            can_data.append(frame.data.hex()[i] + frame.data.hex()[i + 1])
        can_id= str(hex(frame.can_id))
        if can_id == '0x338':
            pass
        elif can_id == '0x316': #RPM_DASHBOARD (Byte3&Byte2)
            RPM_D=int(int(str(can_data[3])+str(can_data[2]),16)/6.4)
        elif can_id == '0x545':
            B0=str(bin(int(can_data[0],16)))[2:]
            # #print(bin(int(line[41:43], 16)))
            # B3 = bin(str(can_data[3]))
            if B0=='01':
                CHECK_ENG=True
            # if B3=='0010':
            #     OIL_LVL=True
            # if B3=='0100':
            #     OIL_PRESS=True
            pass

        elif can_id == '0x613':
            pass
        elif can_id == '0x615':
            pass
        elif can_id == '0x1f0':
            pass
        elif can_id == '0x1f3':
            pass
        elif can_id == '0x153':#SPEED
            SPEED_S= int(float(int(str(can_data[2])+str(can_data[1][1:]),16))/7.6)
            pass
        elif can_id == '0x610':
            pass
        elif can_id == '0x1f5':
            pass
        elif can_id == '0x329':#WATER_TEMP (Byte1)
            WATER_T=int(float((0.75*int(can_data[1],16)))-48.373)
            THROTTLE_P=int(int(can_data[5],16)/254)

        data = {
            "SPEED": SPEED_S,
            "RPM": RPM_D,
            "Water": WATER_T,
        }
        print(json.dumps(data))

read()
