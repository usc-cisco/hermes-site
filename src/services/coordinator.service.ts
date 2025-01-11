import { AxiosResponse } from "axios"

import { api } from "../config/axios"
import { Coordinator } from "../types/entities/Coordinator"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

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
}
