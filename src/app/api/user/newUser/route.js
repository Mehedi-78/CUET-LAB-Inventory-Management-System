import db from "@/lib/db";
import { authMiddlware } from "../../apiMiddleWare";
import User from "@/models/User";
import Auth from "@/lib/auth";

export const POST = async (req) => {
    await db.connect()
    try {
        await db.connect()
        const users = await User.find({ isVerified: false })
        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}