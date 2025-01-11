import React from "react"

import QueueCard from "../components/queue-card/QueueCard"
import { useQueueData } from "../hooks/useQueueData"
import { useStatusUpdate } from "../hooks/useStatusUpdate"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

const AdminPage: React.FC = () => {
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

  // Combine the data into an array after the hooks are called
  const queueData = [csQueueData, itQueueData, isQueueData]

  const handleStatusUpdate = async (course: CourseNameEnum, newStatus: TeacherStatusEnum) => {
    const result = await updateStatus(course, newStatus)
    if (!result.success) {
      console.log("Failed to update status. Please try again")
    }
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-3 md:gap-6">
          {queueData.map((data, index) => {
            const { numberData, coordinatorData } = data

            if (numberData.error || coordinatorData.error) return <div key={index}>Error Loading Data</div>
            if (!numberData.data || !coordinatorData.data) return <div key={index}>Loading...</div>

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
                onUpdateQueue={() => alert("Updated Queue!")}
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
