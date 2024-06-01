"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const port = process.env.PORT || 8000;
app_1.default.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
// makePrediction(23.45, 50.61, 6.07, 173.56, 1.0).then(m => console.log(m))
// console.log(getPlanting(seasons.winter, "maize"))
