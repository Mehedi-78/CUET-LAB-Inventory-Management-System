import { NextResponse } from "next/server";
import Auth from "./src/lib/auth";

export default async function middleware(req) {
    let decoded = await Auth(req)

    let path = req.nextUrl.pathname
    if (path?.startsWith('/signin') || path?.startsWith('/signup')) {
        if (decoded) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }
    else if (path?.startsWith('/admin')) {
        if (decoded && decoded?.role!='admin') {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }
    // else if (path.startsWith('/handle-demand')) {
    //     if (decoded?.role!='manager' || decoded?.role!='admin') {
    //         return NextResponse.redirect(new URL('/', req.url))
    //     }
    //     return NextResponse.next()
    // }
    else {
        if (!decoded) {
            return NextResponse.redirect(new URL(`/signin?callback=${req.nextUrl.pathname}`, req.url))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/',
        '/admin',
        '/main-lab/:path*',
        '/os-lab', '/computer-lab', '/microprocessor-lab',
        '/handle-demand',
        '/request-management-index',
        '/sigin', '/signup',
    ]
}