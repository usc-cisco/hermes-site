import { api } from "../config/axios"
import { QueueNumber } from "../types/entities/QueueNumber"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

export class QueueService {
  static async enqueue(course: CourseNameEnum, accessToken: string) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }

      const response = await api.post(`/queue/${course}/number`, {}, { headers })

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
