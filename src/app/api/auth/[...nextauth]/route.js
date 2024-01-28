import NextAuth from "next-auth";
import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import db from "@/lib/db";
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials, req) {
                const { email, password } = credentials
                try {
                    if (!email || !password) {
                        throw new Error({ error: "Empty Field" })
                    }
                    await db.connect()

                    const user = await User.findOne({ email })
                    // console.log(user);
                    if (!user) {
                        throw new Error("User does not exist")
                    }

                    const comparePass = await bcrypt.compare(password, user.password)

                    if (!comparePass) {
                        throw new Error("Invalid credentials!")
                    } else {
                        if (!user.isVerified) {
                            throw new Error("User is not verified yet!")
                        }
                        const { password, ...currentUser } = user._doc
                        // console.log({user})
                        const accessToken = signJwtToken(currentUser, { expiresIn: '6d' })

                        return {
                            ...currentUser,
                            accessToken,
                        }
                    }
                } catch (error) {
                    console.log({ shajid: "Shajid's Error", Error: error.message });
                    throw new Error(error)
                }
            }
        }),
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/signin',
        error: '/signin/error',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                // console.log({ user, account, profile, email, credentials })
                if (credentials) return user
                else if (user.email) {
                    return user
                }
                return false
            } catch (err) {
                console.log({ Error: err });
                return err
            }
        },
        async jwt({ token, user }) {
            // console.log(token, user);
            if (user) {
                token.accessToken = user.accessToken
                token._id = user._id
                token.role = user.role
                token.name = user.name
                token.email = user.email
            }

            return token
        },
        async session({ session, token }) {
            // console.log({ session, token });
            if (token) {
                session.user._id = token._id
                session.user.name = token.name
                session.user.accessToken = token.accessToken
                session.user.role = token.role
                session.user.email = token.email
            }
            return session
        },
    },
    // debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }