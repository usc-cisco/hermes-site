import { AxiosResponse } from "axios"

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

  static async updateCoordinatorStatus(course: CourseNameEnum, status: TeacherStatusEnum, basicAuthToken: string) {
    try {
      // Convert the enum value to its corresponding string representation
      const statusString = TeacherStatusEnum[status].toLowerCase() // Convert to lowercase to match expected values

      const headers = {
        Authorization: `Basic ${basicAuthToken}`,
      }

      const response = await api.patch(`coordinator/admin/${course}/status`, { status: statusString }, { headers })
      return response.data
    } catch (error) {
      console.error("Error updating coordinator status:", error)
      throw new Error("Error Updating Coordinator Status")
    }
  }
}
