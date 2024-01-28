import db from "@/lib/db";
import Request from "@/models/Request";

export const POST = async (req) => {
    try {
        await db.connect()
        const requests=await Request.find()
        // console.log({requests})
        return new Response(JSON.stringify(requests), { status: 200 })
    } catch (error) {
        console.log({Error:error.message})
        return new Response(JSON.stringify(null), { status: 500 })
    }
}