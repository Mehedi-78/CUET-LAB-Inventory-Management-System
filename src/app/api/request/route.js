import db from "@/lib/db";
import Request from "@/models/Request";

export const POST = async (req) => {
    try {
        await db.connect()
        const { role, lab } = await req.json()
        let query = { role: role }
        if (lab) query.lab = lab
        const items = await Request.find(query)
        // console.log({items, query})
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        console.log({ Error: error.message })
        return new Response(JSON.stringify(null), { status: 500 })
    }
}