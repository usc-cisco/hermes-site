import { CourseNameEnum } from "../enums/CourseNameEnum"

export type QueueNumber = {
  id: number
  studetnId: string
  courseName: CourseNameEnum
  queueNumber: number
}
