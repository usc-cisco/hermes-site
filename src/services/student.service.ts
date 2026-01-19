import { AxiosError } from "axios"

import { api } from "../config/axios"

export class StudentService {
  static async addStudent(idNumber: string, name: string, basicAuthToken: string): Promise<{ error?: string }> {
    try {
      const payload = { idNumber, name }
      const response = await api.post("student/admin/add", payload, {
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
        },
      })

      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.error || "Failed to add student")
      }
      console.error("Error adding student:", error)
      // Handle the error appropriately, e.g., log it or return a specific error message
      return { error: error instanceof Error ? error.message : "Failed to add student" }
    }
  }

  static async getStudentById(
    idNumber: string,
    basicAuthToken: string,
  ): Promise<{ student?: { id: string; name: string }; error?: string }> {
    try {
      const response = await api.get(`student/admin/${idNumber}`, {
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
        },
      })

      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 404) {
          return { error: "Student not found" }
        }
        return { error: error.response.data.error || "Failed to fetch student" }
      }
      console.error("Error fetching student:", error)
      return { error: error instanceof Error ? error.message : "Failed to fetch student" }
    }
  }
}
