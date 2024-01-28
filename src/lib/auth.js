import { decode } from 'next-auth/jwt';

const Auth = async (req) => {
    let sessionToken = req.cookies.get('next-auth.session-token')?.value
    const decoded = await decode({
        token: sessionToken,
        secret: process.env.SECRET,
    });
    // console.log({decodedsss: decoded});
    if(!decoded) return null
    return decoded
}

export default Auth