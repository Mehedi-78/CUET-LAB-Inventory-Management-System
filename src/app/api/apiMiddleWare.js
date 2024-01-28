import Auth from "@/lib/auth";

export const authMiddlware = (handler) => {
    return async (req) => {
        let isAuth = await Auth(req)
        console.log({ isAuth });
        if (!isAuth) return new Response(JSON.stringify({ message: "Not Authenticated..."}), {status: 400})
        console.log({ api: "Auth Middlware invoked..." });
        return handler(req)
    }
}

export const authAdminMiddlware = (handler) => {
    return async (req) => {
        let user = await Auth(req)
        console.log({ user });
        console.log({ api: "Auth Middlware invoked..." });
        if (!user || user.role != 'admin') return new Response(JSON.stringify({ message: "Not Authenticated...(only Admin)"}), {status: 400})
        return handler(req)
    }
}