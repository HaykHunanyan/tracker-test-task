import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose'
import config from 'config'

dotenv.config()

interface MyConnectOptions extends ConnectOptions {
    useUnifiedTopology?: boolean
    useNewUrlParser?: boolean
}

const url: string = process.env.dbUrl || config.get<string>('dbUrl')

async function connectDB() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as MyConnectOptions)
        console.log('DB connected')
    } catch (error) {
        console.error('Error connecting to MongoDB:')
    }
}

export { connectDB }
