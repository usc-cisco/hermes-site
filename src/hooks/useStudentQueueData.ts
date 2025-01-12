import useSWR from "swr"

import { QueueService } from "../services/queue.service"

export const useStudentQueueData = (accessToken: string) => {
  const studentQueueData = useSWR(`queue/number`, () => QueueService.findQueueNumber(accessToken), {
    refreshInterval: 1000,
  })

  return { studentQueueData }
}
