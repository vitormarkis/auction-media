import { IUserLogin, IUserSession } from "@/schemas/users"
import axios from "axios"
import Router from "next/router"
import { setCookie } from "nookies"
import { createContext, useContext, useState } from "react"

interface IAuthContext {
  isAuthenticated: boolean
  user: IUserSession | null
  login: (loginPayload: IUserLogin) => Promise<void>
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserSession | null>(null)

  const isAuthenticated = !!user

  async function login({ username, password }: IUserLogin) {
    const { token, user: responseUser } = await axios.post<any, { token: string; user: IUserSession }, any>("/api/login", { username, password })

    setCookie(undefined, "auction-media.accessToken", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    setUser(responseUser)

    Router.push("/gallery")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, user }}>{props.children}</AuthContext.Provider>
}

export const useAuth = (callback: (AuthData: IAuthContext) => any) => (
  callback(useContext(AuthContext))
)
