import axios from "axios"
import { parseCookies } from "nookies"

const { "auction-media.accessToken": token } = parseCookies()

export const api = axios.create({
  baseURL: '/api'
})

api.interceptors.request.use((config) => {
  console.log(config)

  return config
})

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`
}
