import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js'
import app from './app.js';

dotenv.config({
    path: './.env'
})



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3030, () => {
            console.log(`Server is listening to PORT: ${process.env.PORT || 3030}`);
        })
    })
    .catch((error) => {
        console.error(error)
    })