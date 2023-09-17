from socketcan import CanRawSocket, CanFrame
import curses

#Init important vars

stdscr= curses.initscr()
curses.noecho()
curses.cbreak()
curses.curs_set(False)

interface = "can0"
socket = CanRawSocket(interface=interface)


def read(w):
    RPM_D = 0
    WATER_T = -99
    CHECK_ENG = False
    ssss = ""
    while True:
        file = open("can_drive.txt", 'a')
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
            # B0=bin(str(can_data[0]))
            # #print(bin(int(line[41:43], 16)))
            # B3 = bin(str(can_data[3]))
            # if B0=='01':
            #     CHECK_ENG=True
            # if B3=='0010':
            #     OIL_LVL=True
            # if B3=='0100':
            #     OIL_PRESS=True

        elif can_id == '0x613':
            SPEED_S=int(can_data[1], 16)*10
            #file.write("can0  {0:8X}   [{1}]  {2} \n".format(frame.can_id, len(frame.data)," ".join(["{0:02X}".format(b) for b in frame.data])))
            pass
        elif can_id == '0x615':
            pass
        elif can_id == '0x1f0':
            #file.write("can0  {0:8X}   [{1}]  {2} \n".format(frame.can_id, len(frame.data)," ".join(["{0:02X}".format(b) for b in frame.data])))
            pass
        elif can_id == '0x1f3':
            pass
        elif can_id == '0x153':#SPEED
            file.write("can0  {0:8X}   [{1}]  {2} \n".format(frame.can_id, len(frame.data)," ".join(["{0:02X}".format(b) for b in frame.data])))
            pass
        elif can_id == '0x610':
            #file.write("can0  {0:8X}   [{1}]  {2} \n".format(frame.can_id, len(frame.data)," ".join(["{0:02X}".format(b) for b in frame.data])))
            pass
        elif can_id == '0x1f5':
            pass
        elif can_id == '0x329':#WATER_TEMP (Byte1)
            WATER_T=float((0.75*int(can_data[1],16)))-48.373

        w.addstr(0, 1, "RPM: " + str(SPEED_S))
        w.addstr(2,1,"RPM: "+str(RPM_D))
        w.addstr(3,1,"Water: "+str(WATER_T))
        w.addstr(4,1,"Check Engine:"+str(CHECK_ENG))
        w.refresh()
        file.close()
        # if(line[21:25] in codes):
        #     codes[line[21:25]]+=1
        # else:
        #     codes[line[21:25]]=1
        #print(line[21:24]+" "+line[30:55])


curses.wrapper(read)
