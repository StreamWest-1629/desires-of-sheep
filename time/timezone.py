from datetime import datetime
from timezonefinder import TimezoneFinder
from pytz import timezone

tf = TimezoneFinder()

def GetTimeZone(latitude, longitude):
    return tf.timezone_at(
        lng = float(longitude), 
        lat = float(latitude)
    )

def ConvertFromUtc(dt:datetime, tz:str):
    timeZone = timezone(tz)
    return timeZone.fromutc(dt)

# tz = GetTimeZone(35.681, 140.0324)
# print(tz)
# utc = datetime.utcnow()
# local = ConvertFromUtc(utc, tz)
# print(local)
