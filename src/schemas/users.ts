import { z } from "zod";

/**
 * Schemas
 */

export const userSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar_url: z.string().nullable(),
})

export const userSessionSchema = userSchema.pick({
  name: true,
  username: true,
  email: true,
  avatar_url: true,
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
export type IUserSession = z.infer<typeof userSessionSchema>