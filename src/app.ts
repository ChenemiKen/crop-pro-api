import express from 'express';


const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Crop pro');
})

app.post('/predict', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

export default app