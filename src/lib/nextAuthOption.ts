import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./databaseConnection";
import User from "@/Schema/User.Schema";
import bcrypt from "bcryptjs";
export const nextAuthOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Provide the email and password");
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }
          if (user.password !== credentials.password) {
            throw new Error("Invalid password");
          }

          const isValidUser = bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidUser) {
            throw new Error("Invalid password");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
        if(user){
            token.id = user.id
        }
        return token
    },
    async session({session, token}){
        if(session.user){
            session.user.id = token.id as string
        }
        return session
    }
  },
  session:{
    strategy:"jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
};
