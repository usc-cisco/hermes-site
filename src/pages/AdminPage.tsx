import React, { useState } from "react"

import QueueCard from "../components/QueueCard"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

const AdminPage: React.FC = () => {
  //-- STATIC VALUES -- Remove once proper fetching is done
  const [queues, setQueues] = useState([
    { program: ProgramEnum.CS, current: 48, total: 130, status: TeacherStatusEnum.AVAILABLE, teacher: "Dorris Roa" },
    { program: ProgramEnum.IT, current: 48, total: 130, status: TeacherStatusEnum.AWAY, teacher: "Gran Sabandal" },
    {
      program: ProgramEnum.IS,
      current: 48,
      total: 130,
      status: TeacherStatusEnum.UNAVAILABLE,
      teacher: "Gran Sabandal",
    },
  ])

  //Function to update the queue number
  const updateQueue = (index: number) => {
    setQueues((prev) => {
      const newQueues = [...prev] // Creates a copy of previous state
      newQueues[index].current += 1 // Increments current queue number
      return newQueues //Returns updated state
    })
  }

  //Function to update the program status
  const updateStatus = (index: number, status: TeacherStatusEnum) => {
    setQueues((prev) => {
      const newQueues = [...prev] //Creates a copy of previous state
      newQueues[index].status = status //Update status for specified program
      return newQueues //Return updated state
    })
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center py-8 md:py-12">
      {/* Main content container with padding */}
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Cards container with responsive gap and layout */}
        <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-3 md:gap-6">
          {queues.map((queue, index) => (
            <QueueCard
              key={index}
              program={queue.program}
              current={queue.current}
              total={queue.total}
              status={queue.status}
              teacher={queue.teacher}
              onUpdateQueue={() => updateQueue(index)} //Pass function to update the queue
              onStatusChange={(status) => updateStatus(index, status as TeacherStatusEnum)} //Pass function to update status
              isAdmin={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
