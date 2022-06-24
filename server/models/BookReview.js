import mongoose from "mongoose";

const ReviewBookSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookid: {
        type: String,
    }
},
    { timestamps: true }
)

export default mongoose.model('ReviewBook', ReviewBookSchema)