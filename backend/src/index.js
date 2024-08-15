import dotenv from 'dotenv'
import connectDB from './db/db.js'
// import mongoose from 'mongoose'
// import {DB_NAME} from './constants'

dotenv.config({
    path:'./env'
})

connectDB();


// IIFE Method to connect Database

// ;(async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log("ERROR: ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw error
//     }
// })()