import db from "@/lib/db";
import Request from "@/models/Request";

export const POST = async (req) => {
    try {
        await db.connect()
        const item = await req.json()
        console.log(item)
        const updated = await Request.findOneAndUpdate({ _id: item._id }, { status: item.status, supply: item.supply, available:item.available })
        return new Response(JSON.stringify(updated), { status: 200 })
    } catch (error) {
        console.log({ Error: error.message })
        return new Response(JSON.stringify(null), { status: 500 })
    }
}