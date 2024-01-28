import db from "@/lib/db";
import User from "@/models/User";

export const POST = async (req) => {
    await db.connect()
    try {
        await db.connect()
        const {_id, lab}=await req.json()
        const user = await User.findOneAndUpdate({ _id }, {role: 'asistant', lab})
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}