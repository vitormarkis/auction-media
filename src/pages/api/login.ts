import { userLoginSchema } from "@/schemas/users"
import { prisma } from "@/server/db"
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { env } from "@/env.mjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password, username } = userLoginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) return res.status(404).json({ message: "Usuário não encontrado." })

    const passwordMatches = bcrypt.compareSync(password, user.password)

    if(!passwordMatches) return res.status(400).json({ message: "Usuário ou senha incorretos." })

    const accessToken = jwt.sign({ user_id: user.id }, env.SERVER_SECRET_KEY, {
      subject: user.id,
    })

    return res.cookie
  }
}
