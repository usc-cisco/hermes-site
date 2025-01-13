import { CourseNameEnum } from "../enums/CourseNameEnum"

export type QueueNumber = {
  id: number
  studentId: string
  courseName: CourseNameEnum
  queueNumber: number
}
