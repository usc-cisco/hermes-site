import { api } from "../config/axios"
import { QueueNumber } from "../types/entities/QueueNumber"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

export class QueueService {
  static async updateQueue(course: CourseNameEnum, basicAuthToken: string) {
    try {
      const headers = {
        Authorization: `Basic ${basicAuthToken}`,
      }
      const response = await api.patch(`queue/admin/${course}/number/current`, undefined, { headers })
      return response.data
    } catch (error) {
      console.error(`Error updating queue for ${course}`, error)
      throw new Error(`Error updating queue for ${course}`)
    }
  }

  static async enqueue(course: CourseNameEnum, accessToken: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }

      const response = await api.post(`/queue/${course}/number`, undefined, { headers })

      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("Something went wrong")
    }
  }
  static async dequeue(accessToken: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }

      const response = await api.delete("/queue/number", { headers })

      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("Something went wrong")
    }
  }

  static async findQueueNumber(accessToken: string): Promise<QueueNumber | undefined> {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }

      const response = await api.get<QueueNumber>("/queue/number", { headers })

      return response.data
    } catch (error) {
      console.error(error)
      throw new Error("Something went wrong")
    }
  }
}
