"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrediction = void 0;
const { PythonShell } = require('python-shell');
async function makePrediction(temperature, humidity, ph, water, crop) {
    const pythonScriptPath = 'prediction.py';
    const options = {
        mode: 'text',
        // pythonPath: 'python3', // Modify this to your Python executable path
        pythonOptions: ['-u'], // unbuffered output
        scriptPath: __dirname,
        args: [temperature, humidity, ph, water, crop],
    };
    return await PythonShell.run(pythonScriptPath, options).then((message) => {
        return message[0];
    });
}
exports.makePrediction = makePrediction;
