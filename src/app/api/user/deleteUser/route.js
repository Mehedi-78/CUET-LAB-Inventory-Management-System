import Auth from "@/lib/auth";
import db from "@/lib/db";
import User from "@/models/User";

// export const GET = async (req) => {
//     console.log({req:req.query})
//     try {
//         await db.connect()
//         const id=req.params()
//         const users = await User.findOne({ _id:id })
//         return new Response(JSON.stringify(users._doc), { status: 200 })
//     } catch (error) {
//         return new Response(JSON.stringify(null), { status: 500 })
//     }
// }

export const POST = async (req) => {
    await db.connect()
    try {
        const id = await req.json();
        const user = await User.findOneAndDelete({ _id: id })
        // console.log(user)
        return new Response(JSON.stringify("Successfull"), { status: 200 })
    } catch (error) {
        console.log({ error: error.message })
        return new Response(JSON.stringify(null), { status: 500 })
    }
}