import { useCallback } from "react"

import { mutate } from "swr"

import { CoordinatorService } from "../services/coordinator.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

export const useStatusUpdate = () => {
  const updateStatus = useCallback(async (course: CourseNameEnum, newStatus: TeacherStatusEnum) => {
    try {
      await CoordinatorService.updateStatus(course, newStatus)

      //Revalidates coordinator data after status update
      await mutate(`coordinator/${course}`)
      return { success: true }
    } catch (error) {
      console.error("Failed to update status: ", error)
      return { success: false, error }
    }
  }, [])

  return { updateStatus }
}
