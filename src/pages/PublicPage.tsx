import React, { useEffect, useState } from "react"

import { Text } from "@mantine/core"
import { Link } from "react-router"
import useSound from "use-sound"

import CardLoader from "../components/layout/CardLoader"
import QueueCard from "../components/queue-card/QueueCard"
import { useQueueData } from "../hooks/useQueueData"
import { announcements } from "../types/constants/announcements"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import publicPageAlarm from "/public-page-alarm.mp3"

const PublicPage: React.FC = () => {
  const [play] = useSound(publicPageAlarm)
  const queues = [
    { program: ProgramEnum.CS, course: CourseNameEnum.BSCS },
    { program: ProgramEnum.IT, course: CourseNameEnum.BSIT },
    { program: ProgramEnum.IS, course: CourseNameEnum.BSIS },
  ]

  // Call hooks individually at the top level
  const csQueueData = useQueueData(CourseNameEnum.BSCS)
  const itQueueData = useQueueData(CourseNameEnum.BSIT)
  const isQueueData = useQueueData(CourseNameEnum.BSIS)

  // Add effect to monitor changes in queue data
  useEffect(() => {
    // Only play sound if data is available and not in loading state
    if (!csQueueData.numberData.isLoading && csQueueData.numberData.data) {
      play()
    }
  }, [csQueueData.numberData.data?.currentStudentId, play])

  useEffect(() => {
    if (!itQueueData.numberData.isLoading && itQueueData.numberData.data) {
      play()
    }
  }, [itQueueData.numberData.data?.currentStudentId, play])

  useEffect(() => {
    if (!isQueueData.numberData.isLoading && isQueueData.numberData.data) {
      play()
    }
  }, [isQueueData.numberData.data?.currentStudentId, play])

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
      <main className="flex flex-1 flex-col items-center">
        <div className="my-auto flex w-4/5 max-w-7xl flex-col items-center justify-between gap-y-12 py-8 md:py-8">
          <div className="space-between flex w-full items-center gap-8">
            {queueData.map((data, index) => {
              const { numberData, coordinatorData } = data
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
                  className="scale-115 pb-12 shadow-black"
                />
              )
            })}
          </div>
          <div className="mb-4 flex w-full flex-col gap-3 rounded-lg bg-white p-4 shadow-md">
            <Text className="font-bold">Announcements</Text>
            {announcements.map((announcement) => (
              <ul key={announcement.id} className="ml-4">
                <li className="flex flex-col gap-y-1">
                  <Text>{announcement.date.toDateString()}</Text>
                  <ul className="ml-8 list-disc text-gray-700">
                    {announcement.points.map((point) => (
                      <li key={`${announcement.id}-${point}`}>
                        <Text>{point}</Text>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default PublicPage

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
