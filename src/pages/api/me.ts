import { prisma } from "@/server/db"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { token } = z.object({ token: z.string() }).parse(req.query)

    const decodedToken = jwt.decode(token)
    if (!decodedToken) return res.status(400).json({ message: "Token inválido." })

    const { sub: userId } = decodedToken

    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    })

    if (!user) return res.status(404).json({ message: "Usuário não encontrado." })

    const { password, ...sessionUser } = user

    return res.json(sessionUser)
  }
}
