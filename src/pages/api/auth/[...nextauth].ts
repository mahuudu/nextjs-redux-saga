import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:6100/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        console.log("data1", data);

        if (!res.ok) {
          throw new Error(data.message);
        }
        // If no error and we have user data, return it
        if (res.ok && data.data.token) {
          // Make subsequent API call using the received token
          //   const apiResponse = await fetch(
          //     "http://localhost:6100/api/v1/other-api-endpoint",
          //     {
          //       method: "GET",
          //       headers: {
          //         Authorization: `Bearer ${data.token}`,
          //         // Add other headers as needed
          //       },
          //     }
          //   );

          if (true) {
            // const apiData = await apiResponse.json();
            // Handle the API response data
            // console.log("API response:", apiData);
            const newData: any = {
              token: data?.data.token,
              user: {
                name: "du",
                role: "admin",
              },
            };
            return newData;
          } else {
            throw new Error("Failed to fetch data from API");
          }

          // Return the user data or perform any other actions
          return data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      let data: any = await user;
      console.log("data1111111111", data);

      if (data) {
        token.user = data.user;
        token.accessToken = data?.token;
        return token;
      }
      return token;
    },
    async session({ session, token, user } : any) {
      console.log("token", token);

      session = token as any;
      session.profile = null

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
