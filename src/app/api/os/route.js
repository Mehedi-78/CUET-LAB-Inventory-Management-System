import db from "@/lib/db";
import Items from "@/models/Items";
import OsItems from "@/models/OsItems";

export const POST = async (req) => {
    try {
        await db.connect()
        const items = await OsItems.find().sort({ createdAt: -1 })
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}