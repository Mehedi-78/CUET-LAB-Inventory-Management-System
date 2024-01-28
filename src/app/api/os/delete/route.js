import db from "@/lib/db";
import OsItems from "@/models/OsItems";

export const POST = async (req) => {
    try {
        await db.connect()
        const id = await req.json()
        // console.log({ item })
        await OsItems.findByIdAndDelete(id)
        return new Response(JSON.stringify("Successful!"), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}