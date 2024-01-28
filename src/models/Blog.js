import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
        // required: true,
    },
    // likes: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "User",
    //     default: []
    // }
}, {timestamps: true})

export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema)