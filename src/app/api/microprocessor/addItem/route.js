import db from "@/lib/db";
import Items from "@/models/Items";
import MicroprocessorItem from "@/models/MicroprocessorItem";

// export const GET = async (req) => {
//     try {
//         await db.connect()
//         const items = await Items.find()
//         return new Response(JSON.stringify(items), { status: 200 })
//     } catch (error) {
//         return new Response(JSON.stringify(null), { status: 500 })
//     }
// }

export const POST = async (req) => {
    try {
        await db.connect()
        const item = await req.json()
        console.log({item})
        const newItem=await MicroprocessorItem.create(item)
        return new Response(JSON.stringify(newItem._doc), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}