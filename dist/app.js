"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = require('cors');
const controller_1 = require("./controller");
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use(cors());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Crop pro');
});
app.post('/predict', (req, res) => {
    res.send(req.body);
});
app.post('/predict2', controller_1.handlePredict);
exports.default = app;
