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
        const item = await req.json()
        console.log({item})
        const newItem=await ComputerItem.create(item)
        return new Response(JSON.stringify(newItem._doc), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}