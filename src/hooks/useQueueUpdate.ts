import { useCallback } from "react"

import { mutate } from "swr"

import { QueueService } from "../services/queue.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import toast from "../utils/toast"

export const useQueueUpdate = () => {
  const updateQueue = useCallback(async (course: CourseNameEnum, basicAuthToken: string) => {
    try {
      await QueueService.updateQueue(course, basicAuthToken)
      await mutate(`queue/${course}/number/current`)
      toast.success("Successfully moved the queue forward")
      return { success: true }
    } catch (error) {
      toast.error("Failed to move the queue", {
        description: (error as Error).message,
      })
      return { success: false, error }
    }
  }, [])

  return { updateQueue }
}
