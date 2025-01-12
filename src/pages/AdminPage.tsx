import React from "react"

import { Card, Loader } from "@mantine/core"

import QueueCard from "../components/queue-card/QueueCard"
import { useAuth } from "../contexts/AuthContext"
import { useQueueData } from "../hooks/useQueueData"
import { useQueueUpdate } from "../hooks/useQueueUpdate"
import { useStatusUpdate } from "../hooks/useStatusUpdate"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

const AdminPage: React.FC = () => {
  const { basicAuthToken } = useAuth() // Get the basic auth token from AuthContext

  const queues = [
    { program: ProgramEnum.CS, course: CourseNameEnum.BSCS },
    { program: ProgramEnum.IT, course: CourseNameEnum.BSIT },
    { program: ProgramEnum.IS, course: CourseNameEnum.BSIS },
  ]

  // Call hooks individually at the top level
  const csQueueData = useQueueData(CourseNameEnum.BSCS)
  const itQueueData = useQueueData(CourseNameEnum.BSIT)
  const isQueueData = useQueueData(CourseNameEnum.BSIS)
  const { updateStatus } = useStatusUpdate()
  const { updateQueue } = useQueueUpdate()

  // Combine the data into an array after the hooks are called
  const queueData = [csQueueData, itQueueData, isQueueData]

  const handleQueueUpdate = async (course: CourseNameEnum) => {
    console.log("update queue route:")

    if (basicAuthToken) {
      // Check if the token is not null
      const result = await updateQueue(course, basicAuthToken)
      if (!result.success) {
        console.log("Failed to update queue. Please try again")
      } else {
        console.log(`Queue for ${course} updated successfully!`)
      }
    } else {
      console.log("Authorization token is missing.")
    }
  }

  const handleStatusUpdate = async (course: CourseNameEnum, newStatus: TeacherStatusEnum) => {
    if (basicAuthToken) {
      // Check if the token is not null
      const result = await updateStatus(course, newStatus, basicAuthToken)
      if (!result.success) {
        console.log("Failed to update status. Please try again")
      }
    } else {
      console.log("Authorization token is missing.")
    }
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-3 md:gap-6">
          {queueData.map((data, index) => {
            const { numberData, coordinatorData } = data

            if (numberData.error || coordinatorData.error) return <div key={index}>Error Loading Data</div>
            if (!numberData.data || !coordinatorData.data)
              return (
                <Card key={index} shadow="sm" padding="lg" h={200} radius="lg" maw="22rem" w="100%">
                  <div className="flex h-full w-full items-center justify-center">
                    <Loader color="blue" />
                  </div>
                </Card>
              )

            const status = coordinatorData.data.status.toUpperCase() as keyof typeof TeacherStatusEnum
            const teacherStatus = TeacherStatusEnum[status]

            return (
              <QueueCard
                key={index}
                program={queues[index].program}
                current={numberData.data.current}
                total={numberData.data.max}
                status={teacherStatus}
                teacher={coordinatorData.data.name}
                onUpdateQueue={() => handleQueueUpdate(queues[index].course)} // Call handleQueueUpdate
                onStatusChange={(newStatus) => handleStatusUpdate(queues[index].course, newStatus)}
                isAdmin={true}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
