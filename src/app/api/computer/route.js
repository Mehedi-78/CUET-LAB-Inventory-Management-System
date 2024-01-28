import db from "@/lib/db";
import Items from "@/models/Items";
import ComputerItem from "@/models/ComputerItem";

export const POST = async (req) => {
    try {
        await db.connect()
        const items = await ComputerItem.find().sort({ createdAt: -1 })
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}