import db from "@/lib/db";
import Request from "@/models/Request";

export const POST = async (req) => {
    try {
        await db.connect()
        const newItem = await Request.find({
            // role: { $not: { $regex: '\W*((?i)manager(?-i))\W*' } },
            req_type: 'demand',
        }).sort({updatedAt:-1})
        return new Response(JSON.stringify(newItem), { status: 200 })
    } catch (error) {
        console.log({ Error: error.message })
        return new Response(JSON.stringify(null), { status: 500 })
    }
}