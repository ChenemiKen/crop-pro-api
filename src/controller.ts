import { Request, Response } from "express";
import { makePrediction } from "./service";
import { CROPDURATIONS, CROPS } from "./crop";
import { SeasonMonths, seasons } from "./season";

enum countries { NG="NG", ZA="ZA", KE="KE", SD="SD" }

export async function handlePredict(req:Request, res:Response)
  : Promise<Response>{
  const temperature :number = req.body.temperature
  const humidity :number = req.body.humidity
  const ph :number = req.body.ph
  const waterAvailability = req.body.waterAvailability
  const country :countries = req.body.country
  const location :string = req.body.location
  let crop = req.body.selectedCrop

  if(!temperature || !humidity){
    return res.status(400).send({success:false, 
      message: "temperature and humidity are required"})
  }

  if(!country){
    return res.status(400).send({success:false, 
      message: "country is required"})
  }

  if(!ph || !waterAvailability){
    return res.status(400).send({success:false, 
      message: "ph and waterAvailability are required"})
  }

  crop = crop.toLowerCase()
  console.log(crop)
  if(!CROPS[crop]){ 
    return res.status(400).send({success:false, message: "Crop not found"})
  }

  try{
    return await makePrediction(temperature, humidity, ph, waterAvailability, CROPS[crop])
    .then((harvest:string) => {
      return res.send({success:true, 
        data:{
          temperature,
          humidity,
          crop,
          ph,
          waterAvailability,
          country,
          location,
          plantingSeason: getPlanting(harvest, crop),
          harvestSeason: harvest,
          cropDuration: CROPDURATIONS[crop as keyof typeof CROPDURATIONS]
        }
      })
    })
  }catch(err){
    console.log(err)
    return res.status(400).send({success:false, message:"Invalid input data",
      data:[]
    })
  }
}

export async function handlePredictDev(req:Request, res:Response)
  : Promise<Response>{

  const temperature :number = req.body.temperature
  const humidity :number = req.body.humidity
  const ph :number = req.body.ph
  const waterAvailability = req.body.waterAvailability
  const country :countries = req.body.country
  const location :string = req.body.location
  let crop = req.body.selectedCrop

  if(!temperature || !humidity){
    return res.status(400).send({success:false, 
      message: "temperature and humidity are required"})
  }

  if(!country){
    return res.status(400).send({success:false, 
      message: "country is required"})
  }

  if(!ph || !waterAvailability){
    return res.status(400).send({success:false, 
      message: "ph and waterAvailability are required"})
  }

  crop = crop.toLowerCase()
  if(!CROPS[crop]){ 
    return res.status(400).send({success:false, message: "Crop not found"})
  }

  try{
    return await makePrediction(temperature, humidity, ph, waterAvailability, 
      CROPS[crop])
    .then((harvest:string) => {
      return res.send({success:true, 
        data:{
          temperature,
          humidity,
          crop,
          ph,
          waterAvailability,
          country,
          location,
          plantingSeason: getPlanting(harvest, crop),
          harvestSeason: harvest,
          cropDuration: CROPDURATIONS[crop as keyof typeof CROPDURATIONS]
        }
      })
    })
  }catch(err){
    console.log(err)
    return res.status(400).send({success:false, message:"Invalid input data",
      data:[]
    })
  }
}

const months = [
  "", "January", "February", "March", 'April', "May", "June", "July",
  "August", "September", "October", "November", "December"
]

export function getPlanting(harvest:string, crop:string)
  :string{

  const cropDuration = CROPDURATIONS[crop as keyof typeof CROPDURATIONS]
  let harvestMonths: string[]
  harvestMonths = SeasonMonths[harvest as keyof typeof seasons]
  
  const harvestMonthAvg: string = harvestMonths[1] 
  
  let plantingMonthIndex = months.indexOf(harvestMonthAvg) - cropDuration
  if(plantingMonthIndex < 1){plantingMonthIndex = 12 + plantingMonthIndex}
  
  const plantingMonth = months[plantingMonthIndex]
  console.log(plantingMonth)
  for(let [k, v] of Object.entries(SeasonMonths)){
    if(v.indexOf(plantingMonth) >= 0){
      return k
    }
  }

  return ""
}
