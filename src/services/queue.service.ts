import { api } from "../config/axios"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

export class QueueService {
  static async updateQueue(course: CourseNameEnum, basicAuthToken: string) {
    try {
      const headers = {
        Authorization: `Basic ${basicAuthToken}`,
      }
      const response = await api.patch(`queue/admin/${course}/number/current`, { headers })
      return response.data
    } catch (error) {
      console.error(`Error updating queue for ${course}`)
      throw new Error(`Error updating queue for ${course}`)
    }
  }
}
