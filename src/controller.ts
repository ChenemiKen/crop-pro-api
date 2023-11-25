import { Request, Response } from "express";
import { makePrediction } from "./service";
import { CROPS } from "./crop";

export async function handlePredictDev(req:Request, res:Response): Promise<Response>{
  const temperature :number = req.body.temperature
  const humidity :number = req.body.humidity

  if(!temperature || !humidity){
    return res.status(300).send({success:false, 
      message: "temperature and humidity are required"})
  }

  let crop = (req.body.selectedCrop).toLowerCase()
  console.log(crop)
  if(!CROPS[crop]){ 
    return res.status(300).send({success:false, message: "Crop not found"})
  }

  const ph :number = 6.7
  const water :number = 45.4

  try{
    return await makePrediction(temperature, humidity, ph, water, CROPS[crop])
    .then((predictedSeason:string) => {
      return res.send({success:true, 
        data:{
          season: predictedSeason
        }
      })
    })
  }catch(err){
    return res.send({success:false, message:"Invalid input data",
      data:[]
    })
  }
}

export async function handlePredict(req:Request, res:Response): Promise<Response>{
  const temperature :number = req.body.temperature
  const humidity :number = req.body.humidity

  if(!temperature || !humidity){
    return res.status(300).send({success:false, 
      message: "temperature and humidity are required"})
  }

  let crop = (req.body.selectedCrop).toLowerCase()
  console.log(crop)
  if(!CROPS[crop]){ 
    return res.status(300).send({success:false, message: "Crop not found"})
  }

  const ph :number = 6.7
  const water :number = 45.4

  try{
    return await makePrediction(temperature, humidity, ph, water, CROPS[crop])
    .then((predictedSeason:string) => {
      return res.send({success:true, 
        data:{
          season: predictedSeason
        }
      })
    })
  }catch(err){
    return res.send({success:false, message:"Invalid input data",
      data:[]
    })
  }
}