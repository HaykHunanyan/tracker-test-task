import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose'
import config from 'config'
import { blue, yellow, green, red } from 'colorette'

dotenv.config()

interface MyConnectOptions extends ConnectOptions {
    useUnifiedTopology?: boolean
    useNewUrlParser?: boolean
}

const url: string = process.env.dbUrl || config.get<string>('dbUrl')

if (!url) {
    throw new Error(red('Database URL is not defined.'))
}

async function connectDB() {
    try {
        console.log(blue('MongoDB URL:'), yellow(url))
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as MyConnectOptions)
        console.log(green('Connected to MongoDB'))
    } catch (error) {
        console.error(red('Error connecting to MongoDB:'), error)
    }
}

export { connectDB }
