import express from 'express';
var cors = require('cors');

import { handlePredict, handlePredictDev } from './controller';

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Crop pro');
})

app.post('/predict', handlePredict)

app.post('/predict2', handlePredictDev)

export default app