import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        min : 6
    },
    email : {
        type : String,
        required:true,
        unique:true,
        min : 10
    },
    password : {
        type : String,
        required:true,
        min:6,
    },
    profile :{
        type:String
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
    
},
    {timestamps:true}    
)

export default mongoose.model('User',UserSchema)