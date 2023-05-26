import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const res = await fetch('http://localhost:6100/api/v1/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    })
                })

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message);
                }
                // If no error and we have user data, return it
                if (res.ok && data) {
                    return data
                }

                return null;

            },

        }
        )
    ],
    callbacks: {
        async jwt({ token, user }) {

            let data: any = await user;
            if (data) {
                return {
                    token: data?.tokens?.access?.token,
                    refreshToken: data?.tokens?.refresh?.token,
                    user: data?.user,
                };
            }
            return token
        },
        async session({ session, token }) {

            session.user = token as any;

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)