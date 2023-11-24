"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePredict = void 0;
const service_1 = require("./service");
async function handlePredict(req, res) {
    const temperature = req.body.temperature;
    const humidity = req.body.humidity;
    const ph = req.body.ph;
    const water = req.body.water;
    let crop = req.body.crop;
    return await (0, service_1.makePrediction)(temperature, humidity, ph, water, 1.0)
        .then((predictedSeason) => {
        return res.send(predictedSeason);
    });
}
exports.handlePredict = handlePredict;
