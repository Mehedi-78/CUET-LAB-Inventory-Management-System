import Auth from "@/lib/auth";
import db from "@/lib/db";
import { authMiddlware } from "../apiMiddleWare";
import User from "@/models/User";

// export const GET = async (req) => {
//     try {
//         await db.connect()
//         const users = await User.find({ isVerified: true })
//         return new Response(JSON.stringify(users), { status: 200 })
//     } catch (error) {
//         return new Response(JSON.stringify(null), { status: 500 })
//     }
// }

export const POST = async (req) => {

    await db.connect()
    const data = await req.json();
    // console.log({ data, params: req.params });

    try {
        const user = await User.findOne({ _id: data._id })
        // console.log({user})
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}