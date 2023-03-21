import { IUserLogin, IUserSession } from "@/schemas/users"
import { api } from "@/services/axios"
import axios, { Axios, AxiosResponse } from "axios"
import Router from "next/router"
import { parseCookies, setCookie } from "nookies"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

interface IAuthContext {
  isAuthenticated: boolean
  user: IUserSession | null
  login: (loginPayload: IUserLogin) => Promise<void>
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserSession | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { "auction-media.accessToken": token } = parseCookies()
    if (token === "undefined") {
      return
    } else {
      axios.get<IUserSession>("/api/users?token=" + token).then((response) => setUser(response.data))
    }
  }, [])

  const login = useCallback(async ({ username, password }: IUserLogin) => {
    const { data: { token, user: responseUser } } = await axios.post<any, AxiosResponse<{ token: string; user: IUserSession }>, any>("/api/login", { username, password })

    setCookie(undefined, "auction-media.accessToken", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers["Authorization"] = `Bearer ${token}`

    setUser(responseUser)

    Router.push("/gallery")
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, login, user }}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
