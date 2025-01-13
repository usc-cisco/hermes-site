import useSWR from "swr"

import { QueueService } from "../services/queue.service"
import { POLLING_INTERVAL } from "../types/constants/polling-interval"

export const useStudentQueueData = (accessToken: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    accessToken ? `queue/number` : null,
    () => QueueService.findQueueNumber(accessToken),
    {
      refreshInterval: POLLING_INTERVAL,
      revalidateOnFocus: true,
      revalidateIfStale: true,
    },
  )

  return {
    studentQueueData: {
      data,
      error,
      isLoading,
    },
    mutate,
  }
}
