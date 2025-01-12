import { useEffect } from "react"

import CoordinatorCard from "./components/coordinator-card/CoordinatorCard"
import CardLoader from "./components/layout/CardLoader"
import QueueCard from "./components/queue-card/QueueCard"
import UserQueueInfoCard from "./components/user-info/UserQueueInfoCard"
import { useAuth } from "./contexts/AuthContext"
import { useQueueData } from "./hooks/useQueueData"
import { useStudentQueueData } from "./hooks/useStudentQueueData"
import { CourseNameEnum } from "./types/enums/CourseNameEnum"
import { ProgramEnum } from "./types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "./types/enums/TeacherStatusEnum"

function App() {
  const { jwtToken, setSubmittedCourse } = useAuth()
  const { studentQueueData } = useStudentQueueData(jwtToken as string)

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

  const { max, current, courseName } = studentQueueData.data?.courseName
    ? getQueueStatus(studentQueueData.data?.courseName)
    : {}

  useEffect(() => {
    if (courseName) {
      setSubmittedCourse(courseName)
    }
  }, [setSubmittedCourse, courseName])

  return (
    <>
      <div className="mx-8 flex flex-col items-center gap-4 py-8">
        {studentQueueData.data && !studentQueueData.error && courseName ? (
          <>
            <CoordinatorCard course={courseName} />
            <UserQueueInfoCard userNumber={studentQueueData.data?.queueNumber} current={current} total={max} />
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
      </div>
    </>
  )
}

export default App
