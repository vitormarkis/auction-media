import { env } from "@/env.mjs"
import { userLoginSchema } from "@/schemas/users"
import { prisma } from "@/server/db"
import bcrypt from "bcryptjs"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

const customOptions: AuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { password, username } = userLoginSchema.parse(credentials)
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        })

        if (!user) return null

        const passwordMatches = bcrypt.compareSync(password, user.password)

        if (!passwordMatches) return null

        const { password: userPassword, ...sessionUser } = user

        // const accessToken = jwt.sign({}, env.SERVER_SECRET_KEY, {
        //   subject: user.id,
        // })

        // req.headers["Authorization"] = `Bearer ${accessToken}`
        // return req

        return sessionUser
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: env.SERVER_SECRET_KEY,
  pages: {
    signIn: "/auth/login",
  },
}

export default NextAuth(customOptions)
