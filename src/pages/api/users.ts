import { userRegisterSchema } from "@/schemas/users"
import { prisma } from "@/server/db"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcryptjs'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
