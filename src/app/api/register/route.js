import db from "@/lib/db";
import bcrypt from 'bcrypt'
import User from '@/models/User'
import { signJwtToken } from "@/lib/jwt";
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        // await authMiddlware
        await db.connect()
        const { name, email, password: pass, phone, } = await req.json()
        // console.log({ name, email, pass, phone, })
        if (!name || !email || !pass) {
            return new Response(JSON.stringify({ error: "Fill all the field!" }), { status: 400 })
        }

        const isExisting = await User.findOne({ email })

        if (isExisting) {
            return new Response(JSON.stringify(
                {
                    error: "Email already registered"
                }),
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(pass, 10)

        const newUser = await User.create({ name, email, password: hashedPassword, phone, })

        // console.log(newUser);
        const { password, ...user } = newUser._doc

        console.log({ user })
        // const accessToken = signJwtToken(user, { expiresIn: '6d' })
        // return NextResponse.json({ ...user, accessToken }, { status: 200 })
        return new Response(JSON.stringify({ message: "Succesful! Wait until verification" }), { status: 200 })
    } catch (error) {
        console.log({ error: error.message });
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
}