import Auth from "@/lib/auth";
import db from "@/lib/db";
import Blog from "@/models/Blog";
import { authMiddlware } from "../apiMiddleWare";

export const GET = async (req) => {
    try {
        await db.connect()
        if (!(await Auth(req))) {
            return new Response(JSON.stringify({ error: "Unauthorized (wrong or expired token)" }), { status: 403 })
        }
        
        const blogs = await Blog.find().limit(16).populate("authorId")
        return new Response(JSON.stringify({ blogs }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export const POST = authMiddlware(async (req) => {
    await db.connect()

    if (!(await Auth(req))) {
        return new Response(JSON.stringify({ error: "Unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()
        const newBlog = await Blog.create(body)

        return new Response(JSON.stringify(newBlog), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
})