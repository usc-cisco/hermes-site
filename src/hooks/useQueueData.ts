import useSWR from "swr"

import { api } from "../config/axios"
import { CoordinatorService } from "../services/coordinator.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

const fetcher = (url: string) => api.get<{ max: number; current: number }>(url).then((res) => res.data)

export const useQueueData = (course: CourseNameEnum) => {
  const numberData = useSWR(`queue/${course}/number/current`, fetcher)
  const coordinatorData = useSWR(`coordinator/${course}`, () => CoordinatorService.getCoordinatorInfo(course))
  return { numberData, coordinatorData }
}
