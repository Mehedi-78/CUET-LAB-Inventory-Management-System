import mongoose, { Mongoose } from "mongoose";

const RequestSchema = new mongoose.Schema({
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
        default: 0,
    },
    damaged: {
        type: Number,
        default: 0,
    },
    amount: {
        type: Number,
        default: 0,
    },
    supply: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['asistant', 'manager'],
        required: true,
    },
    lab: {
        type: String,
        enum: [null, 'os', 'computer', 'microprocessor'],
        default: null,
    },
    req_type: {
        type: String,
        enum: ['repair', 'restock', 'demand'],
        required: true,
    },
    status: {
        type: String,
        enum: ['p', 'a', 'r'],
        default: 'p',
    },
    seen: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

export default mongoose?.models?.Request || mongoose.model("Request", RequestSchema)