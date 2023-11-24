import app from "./app";
import "dotenv/config"
const { PythonShell } = require('python-shell');

import { makePrediction } from "./controller";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

console.log(makePrediction(23.45, 50.61, 6.07, 173.56, 1.0))