from socket import socket, AF_INET, SOCK_DGRAM
from struct import unpack
from datetime import datetime

serverPath = "time.google.com"

def GetUtcNow(server, port = 123):

    with socket(AF_INET, SOCK_DGRAM) as s:
        s.sendto(b'\x1b' + 47 * b'\0', (server, port))
        result = s.recvfrom(1024)[0]
    if result:
        return datetime.utcfromtimestamp(unpack(b'!12I', result)[10] - 2208988800)
    else:
        None

def Test():
    print(GetUtcNow(serverPath))
