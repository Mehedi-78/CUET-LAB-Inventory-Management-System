import db from "@/lib/db";
import Items from "@/models/Items";

export const POST = async (req) => {
    try {
        await db.connect()
        const id = await req.json()
        // console.log({ item })
        await Items.findByIdAndDelete(id)
        return new Response(JSON.stringify("Successful!"), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}