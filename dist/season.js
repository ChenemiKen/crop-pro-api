"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonMonths = exports.seasons = void 0;
var seasons;
(function (seasons) {
    seasons["winter"] = "winter";
    seasons["spring"] = "spring";
    seasons["summer"] = "summer";
    seasons["autumn"] = "autumn";
    seasons["rainy"] = "rainy";
})(seasons || (exports.seasons = seasons = {}));
exports.SeasonMonths = {
    winter: ["December", "January", "February"],
    spring: ["March", "April",],
    summer: ["July", "August", "September"],
    autumn: ["October", "November"],
    rainy: ["May", "June", "July"]
};
