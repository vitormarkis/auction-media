import { z } from "zod";

/**
 * Schemas
 */

export const userSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export const userLoginSchema = userSchema.pick({
  username: true,
  password: true,
})

export const userRegisterSchema = userSchema



/**
 * Types
 */

export type IUserSchema = z.infer<typeof userSchema>
export type IUserLogin = z.infer<typeof userLoginSchema>
export type IUserRegister = z.infer<typeof userSchema>