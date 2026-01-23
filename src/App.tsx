import { useEffect } from "react"

import { Alert, Text } from "@mantine/core"

import DisclaimerModal from "./components/DisclaimerModal"
import CoordinatorCard from "./components/coordinator-card/CoordinatorCard"
import CardLoader from "./components/layout/CardLoader"
import QueueCard from "./components/queue-card/QueueCard"
import UserQueueInfoCard from "./components/user-info/UserQueueInfoCard"
import { useAuth } from "./contexts/AuthContext"
import { useQueue } from "./contexts/QueueContext"
import { useQueueData } from "./hooks/useQueueData"
import { CourseNameEnum } from "./types/enums/CourseNameEnum"
import { ProgramEnum } from "./types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "./types/enums/TeacherStatusEnum"

function App() {
  const { setSubmittedCourse, isAuthenticated } = useAuth()
  const { studentData, isInQueue, isLoading } = useQueue()

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

  const getQueueStatus = (courseName: CourseNameEnum) => {
    const queue = queueData.find((q) => q.coordinatorData.data?.courseName === courseName)

    return { max: queue?.numberData.data?.max, current: queue?.numberData.data?.current, courseName }
  }

  const { max, current, courseName } = studentData?.courseName ? getQueueStatus(studentData.courseName) : {}

  useEffect(() => {
    if (courseName) {
      setSubmittedCourse(courseName)
    }
  }, [setSubmittedCourse, courseName])

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center bg-white">
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
        `}
      </style>
      <div className="relative z-10 mx-8 flex flex-col items-center gap-4 py-4 md:py-8">
        {isAuthenticated && !isInQueue && !isLoading && (
          <Alert
            w="100%"
            maw="22rem"
            p="lg"
            style={{
              borderRadius: "16px",
              backgroundColor: "red",
            }}
            title={
              <Text size="sm" fw={600} c="white">
                You are not in queue.
              </Text>
            }
          >
            <Text size="sm" c="white">
              Please ask a CISCO officer to add you to a queue.
            </Text>
          </Alert>
        )}
        {studentData && !studentData.error && courseName ? (
          <>
            <CoordinatorCard course={courseName} />
            <UserQueueInfoCard userNumber={studentData.queueNumber} current={current} total={max} course={courseName} />
          </>
        ) : null}
        {queueData.map((data, index) => {
          const { numberData, coordinatorData } = data

          if (numberData.error || coordinatorData.error) return <div key={index}>Error Loading Data</div>
          if (!numberData.data || !coordinatorData.data) return <CardLoader key={index} />

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
            />
          )
        })}
        <DisclaimerModal
          maxPrioritySize={max}
          currentPriority={current}
          studentPriority={studentData?.queueNumber}
          studentCourseName={studentData?.courseName}
        />
      </div>
    </div>
  )
}

export default App
