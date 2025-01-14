import React, { useEffect, useState } from "react"

import { Link } from "react-router"

import CardLoader from "../components/layout/CardLoader"
import Footer from "../components/layout/Footer"
import QueueCard from "../components/queue-card/QueueCard"
import { useQueueData } from "../hooks/useQueueData"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

const PublicPage: React.FC = () => {
  const queues = [
    { program: ProgramEnum.CS, course: CourseNameEnum.BSCS },
    { program: ProgramEnum.IT, course: CourseNameEnum.BSIT },
    { program: ProgramEnum.IS, course: CourseNameEnum.BSIS },
  ]

  // Call hooks individually at the top level
  const csQueueData = useQueueData(CourseNameEnum.BSCS)
  const itQueueData = useQueueData(CourseNameEnum.BSIT)
  const isQueueData = useQueueData(CourseNameEnum.BSIS)
  // Combine the data into an array after the hooks are called
  const queueData = [csQueueData, itQueueData, isQueueData]

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="mb-4 bg-primary px-6 py-4">
        <div className="flex">
          <Link to="/" className="mr-auto w-auto text-xl font-semibold text-white">
            queue.dcism.org
          </Link>
          <div className="flex items-center gap-2 space-x-6">
            <Timer />
          </div>
        </div>
      </nav>
      <main className="flex flex-1 items-center">
        <div className="my-auto flex w-full flex-1 items-center justify-center py-8 md:py-12">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="grid grid-cols-3 items-center gap-32">
              {queueData.map((data, index) => {
                const { numberData, coordinatorData } = data

                // if (numberData.error || coordinatorData.error) return <div key={index}>Error Loading Data</div>
                // if (!numberData.data || !coordinatorData.data) return <CardLoader key={index} />

                // Check for .data field to prevent TS errors
                if (numberData.isLoading || coordinatorData.isLoading || !numberData.data || !coordinatorData.data)
                  return <CardLoader key={index} />
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
                    className="scale-125 pb-12 shadow-black"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PublicPage

/**
 * Not being exported since it's only used here.
 */
const Timer: React.FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div className="text-xl font-semibold text-white">{time.toLocaleTimeString()}</div>
}
