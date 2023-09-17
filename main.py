
#Init important vars
RPM_D=0
WATER_T=-99
CHECK_ENG=False

def read():
    file = open("txt/can.txt",'r')
    line = file.readline()
    codes={}
    while line != '':
        match line[21:24]:
            case '338':#SMG???
                pass
            case '316': #RPM_DASHBOARD (Byte3&Byte2)
                RPM_D=int(int(line[41:43]+line[38:40],16)/6.4)
                print('RPM: '+str(RPM_D))
            case '545':
                B0=bin(int(line[32:34], 16))[2:]
                #print(bin(int(line[41:43], 16)))
                B3 = bin(int(line[41:43], 16))[2:]
                if B0=='01':
                    CHECK_ENG=True
                if B3=='0010':
                    OIL_LVL=True
                if B3=='0100':
                    OIL_PRESS=True

                #print(line)

            case '613':
                SPEED_S=int(line[35:37], 16)
                print("SPEEEEEEEEEEEEEEEEEEEEEEEEED: "+ str(SPEED_S))
                print(line)
                print(line[35:37])
            case '615':
                pass
            case '1f0':
                pass
            case '1f3':
                pass
            case '153':#SPEED
                SPEED_D=line
                # if RPM_D > 1100:
                #     print(SPEED_D)
                #print(line)
            case '610':
                pass
            case '1f5':
                pass
            case '329':#WATER_TEMP (Byte1)
                WATER_T=float((0.75*int(line[35:37],16)))-48.373
                print("Water: "+str(WATER_T))
                pass
        # if(line[21:25] in codes):
        #     codes[line[21:25]]+=1
        # else:
        #     codes[line[21:25]]=1
        #print(line[21:24]+" "+line[30:55])
        line  = file.readline()

    print(codes)

read()