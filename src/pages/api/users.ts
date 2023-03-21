import { userRegisterSchema } from "@/schemas/users"
import { prisma } from "@/server/db"
import bcrypt from "bcryptjs"
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

  if (req.method === "POST") {
    const { email, name, password, username } = userRegisterSchema.parse(req.body)

    const userAlreadyExists = !!(await prisma.user.findUnique({
      where: {
        username,
      },
    }))

    const salt: string = bcrypt.genSaltSync(10)
    const hashPassword: string = bcrypt.hashSync(password, salt)

    if (userAlreadyExists) return res.status(400).json({ message: "Já existe um registro com esse usuário, faça login para continuar." })

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
        username,
      },
    })

    return res.status(201).json({ message: "Usuário registrado com sucesso." })
  }
}
