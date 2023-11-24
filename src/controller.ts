import { Request, Response } from "express";
import { makePrediction } from "./service";

export async function handlePredict(req:Request, res:Response): Promise<Response>{
  const temperature = req.body.temperature
  const humidity = req.body.humidity
  const ph = req.body.ph
  const water = req.body.water
  let crop = req.body.crop
  return await makePrediction(temperature, humidity, ph, water, 1.0)
  .then((predictedSeason:string) => {
    return res.send(predictedSeason)
  })
}