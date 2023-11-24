const { PythonShell } = require('python-shell');


export async function makePrediction(temperature:number, humidity:number, ph:number, 
  water:number, crop:number): Promise<string> {

    const pythonScriptPath = 'prediction.py';
    let predictedSeason:string
    
  
    const options = {
        mode: 'text',
        // pythonPath: 'python3', // Modify this to your Python executable path
        pythonOptions: ['-u'], // unbuffered output
        scriptPath: __dirname,
        args: [temperature, humidity, ph, water, crop],
    }

    return await PythonShell.run(pythonScriptPath, options).then((message:Array<string>) => {
        return message[0]
    })

}

