import db from "@/lib/db";
import OsItems from "@/models/OsItems";

export const POST = async (req) => {
    try {
        await db.connect()
        const { _id, ...item } = await req.json()
        console.log({ item })
        const newItem = await OsItems.findByIdAndUpdate(_id, item)
        return new Response(JSON.stringify(newItem._doc), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}