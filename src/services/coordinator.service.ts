import { AxiosResponse } from "axios"
import { AxiosError } from "axios"

import { api } from "../config/axios"
import { Coordinator } from "../types/entities/Coordinator"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

export class CoordinatorService {
  static async getCoordinatorInfo(course: CourseNameEnum): Promise<Coordinator> {
    try {
      const response: AxiosResponse<Coordinator> = await api.get(`coordinator/${course}`)

      return response.data
    } catch (error) {
      console.log(error)
      throw new Error("Error fetching Coordinator Information.")
    }
  }

  static async updateStatus(course: CourseNameEnum, status: TeacherStatusEnum) {
    try {
      const response = await api.patch(`coordinator/admin/${course}/status`, { status })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        // The request was made but no response was received
        if (error.response) {
          console.error("Response data:", error.response.data)
          console.error("Response status:", error.response.status)
        } else if (error.request) {
          console.error("No response received:", error.request)
        }
      }
      console.error("Error updating coordinator status:", error)
      throw new Error("Error Updating Coordinator Status")
    }
  }
}
