import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Successful connection to MongoDB: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}