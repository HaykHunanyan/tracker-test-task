import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import dotenv from 'dotenv'
import corsMiddleware from './middleware/corsMiddleware'
import { blue, yellow } from 'colorette'
import { connectDB } from './db'
import { validateEvents } from './validate'
import { TrackEvent } from './models/TrackEvent'
import path from 'path'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || config.get('port')

app.use(bodyParser.json())

app.use(
    cors({
        origin: [process.env.frontUrl || config.get('frontUrl')],
        methods: ['GET', 'POST'],
        credentials: true
    })
)

app.use(corsMiddleware)

app.post('/track', async (req, res) => {
    const events = req.body
    if (!validateEvents(events)) {
        return res.status(422).send('Unprocessable Entity')
    }

    try {
        await TrackEvent.insertMany(events)
        res.status(200).send('OK')
    } catch (error) {
        console.error('Error inserting events:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/tracker', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(path.join(__dirname, '../dist', 'tracker.js'))
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(
            blue('Server is running on'),
            yellow(`http://localhost:${PORT}`)
        )
    })
})
