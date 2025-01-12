import { api } from "../config/axios"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

export class AuthService {
  static async studentLogin(payload: { idNumber: string; course: CourseNameEnum }) {
    try {
      const response = await api.post("auth/sign-in", payload)

      return response.data
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
  }

  static async adminLogin(payload: { username: string; password: string }) {
    try {
      const credentials = btoa(`${payload.username}:${payload.password}`)

      const headers = {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      }

      const response = await api.post("auth/admin/sign-in", undefined, { headers })

      return response.data
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
  }
}
