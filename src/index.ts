import app from "./app";
import "dotenv/config"

const port = process.env.PORT || 8000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});