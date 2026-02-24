// auth.ts
import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "email public_profile",
                },
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,

    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl

            // Rutas protegidas
            if (
                pathname.startsWith("/playroom") ||
                pathname.startsWith("/game")
            ) {
                return !!auth
            }

            return true
        },
    },
})