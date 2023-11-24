const { PythonShell } = require('python-shell');

const pythonScriptPath = 'prediction.py';

export function makePrediction(temperature:number, humidity:number, ph:number, 
  water:number, crop:number){

  let predictedSeason:string

  const inputData:any = [];
  
  const options = {
    mode: 'text',
    // pythonPath: 'python3', // Modify this to your Python executable path
    pythonOptions: ['-u'], // unbuffered output
    scriptPath: __dirname,
    args: [JSON.stringify(inputData)],
  }

  const pyshell = new PythonShell(pythonScriptPath, options);

  pyshell.send([temperature, humidity, ph, water, crop])

  pyshell.on('message', (message:any) => {
    // const result = JSON.parse(message);
    predictedSeason = message[0]
    console.log(message)
  });

  // End the Python script
  pyshell.end((err:any, code:any, signal:any) => {
    if (err) throw err;
    console.log('Python script finished with code:', code);
    return predictedSeason
  });

}

