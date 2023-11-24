import express from 'express';
var cors = require('cors');

import { handlePredict } from './controller';

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Crop pro');
})

app.post('/predict', (req, res) => {
    res.send(req.body)
})

app.post('/predict2', handlePredict)

export default app