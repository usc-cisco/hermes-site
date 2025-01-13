import React, { createContext, useContext, useEffect, useState } from "react"

import { useStudentQueueData } from "../hooks/useStudentQueueData"
import { QueueService } from "../services/queue.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import toast from "../utils/toast"
import { useAuth } from "./AuthContext"

interface QueueContextType {
  isInQueue: boolean
  isFirstLoad: boolean
  isLoading: boolean
  hasError: boolean
  studentData: {
    queueNumber: number | undefined
    courseName: CourseNameEnum | undefined
    error?: Error
  } | null
  handleEnqueue: (course: CourseNameEnum) => Promise<void>
  handleDequeue: () => Promise<void>
}

const QueueContext = createContext<QueueContextType | undefined>(undefined)

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { jwtToken } = useAuth()
  const { studentQueueData } = useStudentQueueData(jwtToken as string)
  const [isInQueue, setIsInQueue] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const handleEnqueue = async (course: CourseNameEnum) => {
    try {
      if (!jwtToken) return

      await QueueService.enqueue(course, jwtToken)
      setIsInQueue(true)
      toast.success("Successfully enqueued", {
        description: "Please wait patiently before we can cater to your question",
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Error during enqueue:", error)
      toast.error("An error occurred", {
        description: (error as Error).message,
      })
    }
  }

  const handleDequeue = async () => {
    try {
      if (!jwtToken) return

      await QueueService.dequeue(jwtToken)
      toast.info("Successfully left the queue", {
        description: "You can always rejoin later.",
      })
      setIsInQueue(false)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("Error during dequeue:", error)
      toast.error("An error occurred", {
        description: (error as Error).message,
      })
    }
  }

  useEffect(() => {
    if (studentQueueData.error) {
      return setIsInQueue(false)
    }

    if (studentQueueData?.data?.queueNumber !== undefined) {
      setIsInQueue(studentQueueData.data.queueNumber !== null)
    }
  }, [studentQueueData, jwtToken])

  useEffect(() => {
    setIsFirstLoad(false)
  }, [])

  const value = {
    isInQueue,
    isFirstLoad,
    isLoading: studentQueueData.isLoading,
    hasError: !!studentQueueData.error,
    studentData: studentQueueData.data
      ? {
          queueNumber: studentQueueData.data.queueNumber,
          courseName: studentQueueData.data.courseName,
          error: studentQueueData.error,
        }
      : null,
    handleEnqueue,
    handleDequeue,
  }

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
}

export const useQueue = () => {
  const context = useContext(QueueContext)
  if (context === undefined) {
    throw new Error("useQueue must be used within a QueueProvider")
  }
  return context
}
