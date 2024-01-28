import db from "@/lib/db";
import Items from "@/models/Items";

export const GET = async (req) => {
    try {
        await db.connect()
        const items = await Items.find()
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export const POST = async (req) => {
    try {
        await db.connect()
        const items = await Items.find().sort({ createdAt: -1 })
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}