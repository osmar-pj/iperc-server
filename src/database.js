import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
mongoose.connect(process.env.MONGO_URI, {
    // auth: {
    //     username: 'osmarpj',
    //     password: 'osmarpj123'
    // },
    // authSource: 'admin'
})
.then((db) => console.log('Database connected'))
.catch((err) => console.error(err))