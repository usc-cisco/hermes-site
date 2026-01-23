import React, { useEffect, useState } from "react"

import { Flex, Loader, Text } from "@mantine/core"
import useSound from "use-sound"

import CardLoader from "../components/layout/CardLoader"
import QueueCard from "../components/queue-card/QueueCard"
import { useQueueData } from "../hooks/useQueueData"
import { AnnouncementService } from "../services/announcement.service"
import { Announcement } from "../types/entities/Announcement"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import publicPageAlarm from "/public-page-alarm.mp3"

const PublicPage: React.FC = () => {
  const [play] = useSound(publicPageAlarm)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [announcementsLoading, setAnnouncementsLoading] = useState<boolean>(true)
  const [showTagline, setShowTagline] = useState(false)
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
    if (!csQueueData.numberData.isLoading && csQueueData.numberData.data && csQueueData.numberData.data.current !== 0) {
      play()
    }
  }, [csQueueData.numberData.data?.current, play])

  useEffect(() => {
    if (!itQueueData.numberData.isLoading && itQueueData.numberData.data && itQueueData.numberData.data.current !== 0) {
      play()
    }
  }, [itQueueData.numberData.data?.current, play])

  useEffect(() => {
    if (!isQueueData.numberData.isLoading && isQueueData.numberData.data && isQueueData.numberData.data.current !== 0) {
      play()
    }
  }, [isQueueData.numberData.data?.current, play])

  // Tagline visibility cycling
  useEffect(() => {
    const showTaglineMessage = () => {
      setShowTagline(true)
      setTimeout(() => setShowTagline(false), 15000) // Show for 5 seconds
    }

    // Show initially after 3 seconds
    const initialTimeout = setTimeout(showTaglineMessage, 3000)
    // Then cycle every 30 seconds
    const interval = setInterval(showTaglineMessage, 30000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setAnnouncementsLoading(true)
        const data = await AnnouncementService.getAnnouncements()
        setAnnouncements(data)
      } catch (error) {
        console.error("Error fetching announcements:", error)
        setAnnouncements([])
      } finally {
        setAnnouncementsLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  // Combine the data into an array after the hooks are called
  const queueData = [csQueueData, itQueueData, isQueueData]

  // Group announcements by date
  const groupedAnnouncements = announcements.reduce(
    (acc, announcement) => {
      const date = announcement.date instanceof Date ? announcement.date : new Date(announcement.date)
      const dateKey = date.toDateString()

      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(announcement)
      return acc
    },
    {} as Record<string, typeof announcements>,
  )

  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(groupedAnnouncements).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime()
  })

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      {/* Repeating logo background pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 animate-[drift_8s_linear_infinite] opacity-[0.03]"
        style={{
          backgroundImage: "url('/logo-primary.svg')",
          backgroundSize: "150px 150px",
          backgroundRepeat: "repeat",
          willChange: "background-position",
        }}
      />
      <style>
        {`
          @keyframes drift {
            from {
              background-position: 0 0;
            }
            to {
              background-position: 150px -150px;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
          }
        `}
      </style>
      {/* Tagline message */}
      <div
        className={`pointer-events-none fixed bottom-6 left-0 right-0 z-20 text-center text-sm text-primary ${
          showTagline ? "animate-[fadeIn_0.5s_ease-out_forwards]" : "animate-[fadeOut_0.5s_ease-out_forwards]"
        }`}
        style={{ opacity: 0 }}
      >
        Project Hermes is an Open Source Initiative by DCISM Students &amp; CISCO.
      </div>
      <main className="relative z-10 flex flex-1 flex-col items-center">
        <div className="my-auto flex w-4/5 max-w-7xl flex-col items-center justify-between gap-y-12 py-8 md:py-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <Timer />
            <div className="flex items-center gap-3">
              <img src="/logo-primary.svg" alt="Hermes Logo" className="h-8 w-auto" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">HERMES</span>
                <span className="text-lg text-primary/60">| queue.dcism.org</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-around gap-8">
            {queueData.map((data, index) => {
              const { numberData, coordinatorData } = data
              if (numberData.isLoading || coordinatorData.isLoading || !numberData.data || !coordinatorData.data)
                return <CardLoader key={index} />
              const status = coordinatorData.data.status.toUpperCase() as keyof typeof TeacherStatusEnum
              const teacherStatus = TeacherStatusEnum[status]
              return (
                <QueueCard
                  isShowingCurrentName={true}
                  key={index}
                  program={queues[index].program}
                  current={numberData.data.current}
                  total={numberData.data.max}
                  status={teacherStatus}
                  teacher={coordinatorData.data.name}
                  currentStudent={
                    numberData.data.queuedStudents.length ? numberData.data.queuedStudents[0].student : null
                  }
                  className="scale-115 pb-12 shadow-black"
                />
              )
            })}
          </div>
          <div
            className="mb-4 flex w-full flex-col gap-3 rounded-xl p-6"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
            }}
          >
            <Text className="font-bold">Announcements</Text>
            {announcementsLoading ? (
              <Flex align="center" justify="center" py="md">
                <Loader size="sm" />
              </Flex>
            ) : announcements.length === 0 ? (
              <Text size="sm" c="dimmed">
                No announcements at this time.
              </Text>
            ) : (
              announcements.map((announcement) => (
                <ul key={announcement.id} className="ml-4">
                  <li className="flex flex-col gap-y-1">
                    <Text>
                      {announcement.date instanceof Date
                        ? announcement.date.toDateString()
                        : new Date(announcement.date).toDateString()}
                    </Text>
                    <ul className="ml-8 list-disc text-gray-700">
                      <li key={`${announcement.id}`}>
                        <Text>{announcement.text}</Text>
                      </li>
                    </ul>
                  </li>
                </ul>
              ))
            )}
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

  return <div className="text-7xl font-bold text-primary">{time.toLocaleTimeString()}</div>
}
