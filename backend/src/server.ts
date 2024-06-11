import express from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || config.get('port')

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
