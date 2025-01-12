import React, { useEffect, useState } from "react"

import { Button, Card, Flex } from "@mantine/core"
import { Loader } from "@mantine/core"
import { Trash2 } from "lucide-react"

import { useAuth } from "../../contexts/AuthContext"
import { useStudentQueueData } from "../../hooks/useStudentQueueData"
import { QueueService } from "../../services/queue.service"
import { ProgramEnum } from "../../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../../types/enums/TeacherStatusEnum"
import { convertProgramEnumToCourseNameEnum } from "../../utils/convertProgramEnumToCourseNameEnum"
import toast from "../../utils/toast"
import RevokeConfirmModal from "../user-info/RevokeConfirmModal"
import AdminControls from "./AdminControls"
import QueueButton from "./QueueButton"
import QueueCardHeader from "./QueueCardHeader"
import QueueStatus from "./QueueStatus"

interface QueueCardProps {
  program: ProgramEnum
  current: number
  total: number
  status: TeacherStatusEnum
  teacher: string
  onUpdateQueue?: () => void //Optional as it will be for Admin users
  onStatusChange?: (value: TeacherStatusEnum) => void //Function to handle status change
  isAdmin?: boolean //Checks if current user is admin
}

const QueueCard: React.FC<QueueCardProps> = ({
  program,
  current,
  total,
  status,
  teacher,
  onUpdateQueue,
  onStatusChange,
  isAdmin = false,
}) => {
  const { jwtToken, course: jwtCourse } = useAuth()
  const { studentQueueData } = useStudentQueueData(jwtToken as string)
  const course = convertProgramEnumToCourseNameEnum(program)
  const [isInQueue, setIsInQueue] = useState(false)

  const isStudentCourse = jwtCourse === course

  const disabled = isAdmin
    ? status === TeacherStatusEnum.AWAY || status === TeacherStatusEnum.UNAVAILABLE // Correctly check both statuses
    : status === TeacherStatusEnum.UNAVAILABLE

  const handleEnqueue = async () => {
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
      toast.error("An error occured", {
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
      toast.error("An error occured", {
        description: (error as Error).message,
      })
    }
  }

  useEffect(() => {
    if (studentQueueData?.data?.queueNumber !== undefined) {
      setIsInQueue(studentQueueData.data.queueNumber !== null)
    }
  }, [studentQueueData])

  if (studentQueueData.isLoading)
    return (
      <Card shadow="sm" padding="lg" h={200} radius="lg" maw="22rem" w="100%">
        <div className="flex h-full w-full items-center justify-center">
          <Loader color="blue" />
        </div>
      </Card>
    )

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      maw="22rem"
      w="100%"
      style={{
        outline: isAdmin && status === TeacherStatusEnum.UNAVAILABLE ? "2px solid red" : "none",
      }}
    >
      <QueueCardHeader program={program} current={current} total={total} disabled={disabled} />

      <Flex direction="column" gap="xs">
        <QueueStatus status={status} teacher={teacher} />

        {isAdmin ? (
          <AdminControls
            status={status}
            disabled={disabled}
            onUpdateQueue={onUpdateQueue}
            onStatusChange={onStatusChange}
          />
        ) : !isInQueue && isStudentCourse ? ( // Show button only when not enqueued and isStudentCourse is true
          <QueueButton handleClick={handleEnqueue} disabled={disabled} buttonSize="md" />
        ) : null}

        {isInQueue && isStudentCourse ? (
          <Button
            onClick={() => {
              RevokeConfirmModal.open({ onConfirm: () => handleDequeue() })
            }}
            radius="md"
            size="md"
            c="white"
            bg="red"
            leftSection={<Trash2 size={16} />}
          >
            Leave queue
          </Button>
        ) : null}
      </Flex>
    </Card>
  )
}

export default QueueCard
