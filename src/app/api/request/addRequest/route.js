import db from "@/lib/db";
import Request from "@/models/Request";

export const POST = async (req) => {
    try {
        await db.connect()
        const item = await req.json()
        console.log({item})
        const newItem=await Request.create(item)
        return new Response(JSON.stringify(newItem._doc), { status: 200 })
    } catch (error) {
        console.log({Error:error.message})
        return new Response(JSON.stringify(null), { status: 500 })
    }
}