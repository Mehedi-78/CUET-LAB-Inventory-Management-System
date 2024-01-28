import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    available: {
        type: Number,
        default: 0
    },
    damaged: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
}, {timestamps: true})

export default mongoose?.models?.Item || mongoose.model("Item", ItemSchema)