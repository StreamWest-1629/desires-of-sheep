import sys
# sys.path.append('./../')

from place import GetPlace
from ntp import GetUtcNow
from timezone import GetTimeZone, ConvertFromUtc

def GetTimeFromNet():
    pos = GetPlace()
    if pos is None:
        return None
    
    tz = GetTimeZone(
        latitude    = pos[0], 
        longitude   = pos[1]
    )

    dt = GetUtcNow()

    return ConvertFromUtc(dt, tz)

print(GetTimeFromNet())
