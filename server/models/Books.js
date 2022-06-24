import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
    adminid : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title : {
        type:String,
        required:true,
    },
    description : {
        type : String,
    },
    rent : {
        type : Number,
        required:true,
    },
    image :{
        type:String,
    },
    category : {
        type:String,
        required:true
    },
    author : {
        type:String,
        required : true,
    },
    isAvailable : {
        type : Boolean,
        default : true
    }
    
},
    {timestamps:true}    
)

export default mongoose.model('Books',BooksSchema)