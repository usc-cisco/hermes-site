import { useCallback } from "react"

import { mutate } from "swr"

import { QueueService } from "../services/queue.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

export const useQueueUpdate = () => {
  const updateQueue = useCallback(async (course: CourseNameEnum, basicAuthToken: string) => {
    try {
      await QueueService.updateQueue(course, basicAuthToken)
      await mutate(`queue/${course}/number/current`)
      return { success: true }
    } catch (error) {
      console.error("Failed to update queue: ", error)
      return { success: false, error }
    }
  }, [])

  return { updateQueue }
}
