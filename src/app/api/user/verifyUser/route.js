import Auth from "@/lib/auth";
import db from "@/lib/db";
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
    try {
        const data = await req.json();
        const curr = await User.findOneAndUpdate({ _id: data }, { isVerified: true })
        const {password, ...user}=curr._doc
        
        console.log(user)
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log({ error: error.message })
        return new Response(JSON.stringify(null), { status: 500 })
    }
}