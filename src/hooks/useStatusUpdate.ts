import { useCallback } from "react"

import { mutate } from "swr"

import { CoordinatorService } from "../services/coordinator.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import toast from "../utils/toast"

export const useStatusUpdate = () => {
  const updateStatus = useCallback(
    async (course: CourseNameEnum, newStatus: TeacherStatusEnum, basicAuthToken: string) => {
      try {
        await CoordinatorService.updateCoordinatorStatus(course, newStatus, basicAuthToken) // Pass the token here

        // Revalidates coordinator data after status update
        await mutate(`coordinator/${course}`)
        toast.success(`Successfully updated status of the ${course} coordinator`)
        return { success: true }
      } catch (error) {
        toast.error("Failed to update status", {
          description: (error as Error).message,
        })
        return { success: false, error }
      }
    },
    [],
  )

  return { updateStatus }
}
