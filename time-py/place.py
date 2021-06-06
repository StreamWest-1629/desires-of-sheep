import requests

def GetPlace():
    geo_request_url = 'https://get.geojs.io/v1/ip/geo.json'
    data = requests.get(geo_request_url).json()
    if data is None:
        return None
    return (data['latitude'], data['longitude'])
