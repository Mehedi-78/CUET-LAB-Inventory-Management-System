import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'asistant', 'manager'],
        default: 'user',
        required: true,
    },
    lab: {
        type: String,
        enum: [null, 'os', 'computer', 'microprocessor'],
        default: null,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    phone:{
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '/images/avatar.png'
    },
}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)