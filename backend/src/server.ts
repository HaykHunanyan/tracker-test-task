import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import dotenv from 'dotenv'
import corsMiddleware from './middleware/corsMiddleware'
import { blue, yellow } from 'colorette'
import { connectDB } from './db'
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

app.use('/', require('./api/api.ts'))

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(
            blue('Server is running on'),
            yellow(`http://localhost:${PORT}`)
        )
    })
})
