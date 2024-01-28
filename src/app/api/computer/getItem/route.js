import db from "@/lib/db";
import Items from "@/models/Items";
import ComputerItem from "@/models/ComputerItem";

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
        const id = await req.json()
        const item=await ComputerItem.findOne({_id:id})
        return new Response(JSON.stringify(item._doc), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}