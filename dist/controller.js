"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanting = exports.handlePredict = void 0;
const service_1 = require("./service");
const crop_1 = require("./crop");
const season_1 = require("./season");
const waterph_1 = require("./waterph");
var countries;
(function (countries) {
    countries["NG"] = "NG";
    countries["ZA"] = "ZA";
    countries["KE"] = "KE";
    countries["SD"] = "SD";
})(countries || (countries = {}));
async function handlePredict(req, res) {
    const temperature = req.body.temperature;
    const humidity = req.body.humidity;
    const ph = req.body.ph;
    const waterAvailability = req.body.waterAvailability;
    const country = req.body.country;
    const location = req.body.location;
    let crop = req.body.selectedCrop;
    if (!temperature || !humidity) {
        return res.status(400).send({ success: false,
            message: "temperature and humidity are required" });
    }
    if (!country) {
        return res.status(400).send({ success: false,
            message: "country is required" });
    }
    if (!ph || !waterAvailability) {
        return res.status(400).send({ success: false,
            message: "ph and waterAvailability are required" });
    }
    crop = crop.toLowerCase();
    console.log(crop);
    if (!crop_1.CROPS[crop]) {
        return res.status(400).send({ success: false, message: "Crop not found" });
    }
    const { waterAvailOk, minWaterAvail, maxWaterAvail } = checkWaterAvail(crop, waterAvailability);
    const { minPh, maxPh } = getMinMaxPh(crop);
    try {
        return await (0, service_1.makePrediction)(temperature, humidity, ph, waterAvailability, crop_1.CROPS[crop]).then((harvest) => {
            return res.send({ success: true,
                data: {
                    temperature,
                    humidity,
                    crop,
                    ph,
                    minPh,
                    maxPh,
                    waterAvailability,
                    waterAvailOk,
                    minWaterAvail,
                    maxWaterAvail,
                    country,
                    location,
                    plantingSeason: getPlanting(harvest, crop),
                    harvestSeason: harvest,
                    cropDuration: crop_1.CROPDURATIONS[crop]
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ success: false, message: "Invalid input data",
            data: []
        });
    }
}
exports.handlePredict = handlePredict;
const months = [
    "", "January", "February", "March", 'April', "May", "June", "July",
    "August", "September", "October", "November", "December"
];
function getPlanting(harvest, crop) {
    const cropDuration = crop_1.CROPDURATIONS[crop];
    let harvestMonths;
    harvestMonths = season_1.SeasonMonths[harvest];
    const harvestMonthAvg = harvestMonths[1];
    let plantingMonthIndex = months.indexOf(harvestMonthAvg) - cropDuration;
    if (plantingMonthIndex < 1) {
        plantingMonthIndex = 12 + plantingMonthIndex;
    }
    const plantingMonth = months[plantingMonthIndex];
    for (let [k, v] of Object.entries(season_1.SeasonMonths)) {
        if (v.indexOf(plantingMonth) >= 0) {
            return k;
        }
    }
    return "";
}
exports.getPlanting = getPlanting;
function checkWaterAvail(crop, entry) {
    const cropWaterAvailabilityRange = waterph_1.waterAvailabilityRanges[crop];
    let waterAvailOk = false;
    if (entry > cropWaterAvailabilityRange.min &&
        entry < cropWaterAvailabilityRange.max) {
        waterAvailOk = true;
    }
    return {
        waterAvailOk,
        minWaterAvail: Number(cropWaterAvailabilityRange.min.toFixed(2)),
        maxWaterAvail: Number(cropWaterAvailabilityRange.max.toFixed(2))
    };
}
function getMinMaxPh(crop) {
    const cropPhRange = waterph_1.phRanges[crop];
    return {
        minPh: Number(cropPhRange.min.toFixed(2)),
        maxPh: Number(cropPhRange.max.toFixed(2))
    };
}
