import app from "./app";
import "dotenv/config"

import { makePrediction } from "./service";
import { getPlanting } from "./controller";
import { seasons } from "./season";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// makePrediction(23.45, 50.61, 6.07, 173.56, 1.0).then(m => console.log(m))

// console.log(getPlanting(seasons.winter, "maize"))