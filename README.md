# Crop Pro
Backend API for Crop Pro; a farm assistant that will be helping you predict the ideal time to plant and harvest your crops, taking into account local weather conditions in your area and soil quality..

The server exposes the endpoint `/predict` which takes parameters for the crop and weather conditions and returns the availlable recommendations for planting and harvesting.

### Sample request
```
{
    "temperature":23,
    "humidity":4.54,
    "country": "NG",
    "ph": 7,
    "waterAvailability": 78,
    "selectedCrop": "rice"
}
```
### Sample response
```
{
    "success": true,
    "data": {
        "temperature": 23,
        "humidity": 4.54,
        "crop": "rice",
        "ph": 7,
        "minPh": 5.01,
        "maxPh": 7.87,
        "waterAvailability": 78,
        "waterAvailOk": false,
        "minWaterAvail": 182.56,
        "maxWaterAvail": 298.56,
        "country": "NG",
        "plantingSeason": "summer",
        "harvestSeason": "winter",
        "cropDuration": 4
    }
}
```