import { useCallback } from "react"

import { mutate } from "swr"

import { CoordinatorService } from "../services/coordinator.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

export const useStatusUpdate = () => {
  const updateStatus = useCallback(
    async (course: CourseNameEnum, newStatus: TeacherStatusEnum, basicAuthToken: string) => {
      try {
        await CoordinatorService.updateCoordinatorStatus(course, newStatus, basicAuthToken) // Pass the token here

        // Revalidates coordinator data after status update
        await mutate(`coordinator/${course}`)
        return { success: true }
      } catch (error) {
        console.error("Failed to update status: ", error)
        return { success: false, error }
      }
    },
    [],
  )

  return { updateStatus }
}
