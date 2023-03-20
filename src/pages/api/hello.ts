import { userRegisterSchema } from "@/schemas/users"
import { prisma } from "@/server/db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      const { email, name, password, username } = userRegisterSchema.parse(req.body)

      // await prisma.user
      
      break
    }
    case "GET":
      console.log("Pegando usuários")
    default:
      break
  }
}
