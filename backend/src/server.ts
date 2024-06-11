import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import dotenv from 'dotenv'
import { connectDB } from './db'

dotenv.config()

const app = express()
const PORT = process.env.PORT || config.get('port')

app.use(bodyParser.json())

app.get('/tracker', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(__dirname + '/tracker.js')
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
})
