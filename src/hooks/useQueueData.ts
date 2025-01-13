import useSWR from "swr"

import { api } from "../config/axios"
import { CoordinatorService } from "../services/coordinator.service"
import { POLLING_INTERVAL } from "../types/constants/polling-interval"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"

const fetcher = (url: string) =>
  api.get<{ currentStudentId: string | null; max: number; current: number }>(url).then((res) => res.data)

export const useQueueData = (course: CourseNameEnum) => {
  const numberData = useSWR(`queue/${course}/number/current`, fetcher, {
    refreshInterval: POLLING_INTERVAL,
  })
  const coordinatorData = useSWR(`coordinator/${course}`, () => CoordinatorService.getCoordinatorInfo(course), {
    refreshInterval: POLLING_INTERVAL,
  })

  console.log(numberData.data)
  return { numberData, coordinatorData }
}
