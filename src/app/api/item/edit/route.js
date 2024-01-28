import db from "@/lib/db";
import Items from "@/models/Items";

export const POST = async (req) => {
    try {
        await db.connect()
        const item = await req.json()
        // console.log({ item })
        await Items.findByIdAndUpdate(item._id, item)
        const newItem = await Items.findOne({ _id: item._id })
        return new Response(JSON.stringify(newItem._doc), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}