import mongoose from "mongoose";

const ComputerItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
    },
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

export default mongoose?.models?.ComputerItem || mongoose.model("ComputerItem", ComputerItemSchema)