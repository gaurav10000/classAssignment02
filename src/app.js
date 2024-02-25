import express from 'express';
import cors from 'cors';


const app = express()

app.use(cors({
    origin: "*"
}))


app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send("Still making it, wait for it!")
})

import itemRouter from './routes/item.routes.js'

app.use('/Item', itemRouter)


export default app