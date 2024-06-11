import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import dotenv from 'dotenv'
import corsMiddleware from './middleware/corsMiddleware'
import { blue, yellow } from 'colorette'
import { connectDB } from './db'

dotenv.config()

const app = express()
const PORT = process.env.PORT || config.get('port')

app.use(bodyParser.json())

app.use(corsMiddleware)

app.get('/tracker', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(__dirname + '/tracker.js')
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(
            blue('Server is running on'),
            yellow(`http://localhost:${PORT}`)
        )
    })
})
