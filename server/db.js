import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MongConnection = async ()=>{
    await mongoose.connect(process.env.MONGO_URL,()=>{
        console.log("Database Connected Successfully!!");
    })
}

export default MongConnection