import axios from "axios"
import useSWR from "swr"

import { CourseNameEnum } from "../types/enums/CourseNameEnum"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const useQueueData = (course: CourseNameEnum) => {
  const numberData = useSWR(`https://hermes.dcism.org/queue/${course}/number/current`, fetcher)
  const coordinatorData = useSWR(`https://hermes.dcism.org/coordinator/${course}`, fetcher)
  return { numberData, coordinatorData }
}
