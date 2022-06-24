import mongoose from "mongoose";

const RentBookSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }

},
    { timestamps: true }
)

export default mongoose.model('RentBook', RentBookSchema)