import { Student } from "./Student"

export type CurrentQueueStatus = {
  current: number
  max: number
  queuedStudents: Array<{
    queueNumber: number
    student: Student | null
  }>
}
