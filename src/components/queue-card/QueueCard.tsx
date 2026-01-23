import React from "react"

import { Button, Card, Flex, Text } from "@mantine/core"
import { Info } from "lucide-react"

import { useAuth } from "../../contexts/AuthContext"
import { useQueue } from "../../contexts/QueueContext"
import { Student } from "../../types/entities/Student"
import { ProgramEnum } from "../../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../../types/enums/TeacherStatusEnum"
import { convertProgramEnumToCourseNameEnum } from "../../utils/convertProgramEnumToCourseNameEnum"
import CardLoader from "../layout/CardLoader"
import AdminControls from "./AdminControls"
import QueueCardHeader from "./QueueCardHeader"
import QueueStatus from "./QueueStatus"

interface QueueCardProps {
  program: ProgramEnum
  current: number
  currentStudent?: Student | null
  total: number
  status: TeacherStatusEnum
  teacher: string
  onUpdateQueue?: () => void
  onStatusChange?: (value: TeacherStatusEnum) => void
  isAdmin?: boolean
  className?: string
  isShowingCurrentName?: boolean
  onAddStudentToQueue?: () => void
  onDequeueStudent?: () => void
}

const QueueCard: React.FC<QueueCardProps> = ({
  program,
  current,
  currentStudent,
  total,
  status,
  teacher,
  onUpdateQueue,
  onStatusChange,
  isAdmin = false,
  className,
  isShowingCurrentName = false,
  onAddStudentToQueue,
  onDequeueStudent,
}) => {
  const { course: jwtCourse } = useAuth()
  const { isInQueue, isFirstLoad, isLoading, hasError } = useQueue()
  const course = convertProgramEnumToCourseNameEnum(program)

  const isStudentCourse = jwtCourse === course

  const isHeaderDisabled = isAdmin
    ? [TeacherStatusEnum.AWAY, TeacherStatusEnum.UNAVAILABLE].includes(status)
    : status === TeacherStatusEnum.UNAVAILABLE

  const isAdminControlsDisabled = status === TeacherStatusEnum.UNAVAILABLE

  if (isFirstLoad && isLoading) return <CardLoader />

  return (
    <Card
      shadow="none"
      padding="xl"
      radius="xl"
      maw="22rem"
      w="100%"
      className={className}
      style={{
        outline: isAdmin && status === TeacherStatusEnum.UNAVAILABLE ? "2px solid red" : "none",
        minHeight: "22rem",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
      }}
    >
      <QueueCardHeader
        isAdmin={isAdmin}
        program={program}
        current={current}
        total={total}
        disabled={isHeaderDisabled}
        currentStudent={currentStudent}
        isShowingCurrentName={isShowingCurrentName}
      />

      <Flex direction="column" gap="xl" mt="auto">
        <QueueStatus status={status} teacher={teacher} />

        {isAdmin ? (
          <Flex direction="column" gap="xs" justify="space-between" w="100%">
            <AdminControls
              status={status}
              disabled={isAdminControlsDisabled}
              onUpdateQueue={onUpdateQueue}
              onStatusChange={onStatusChange}
            />
            <div className="flex flex-row gap-2">
              {onAddStudentToQueue && (
                <Button onClick={onAddStudentToQueue} radius="md" size="md" bg="primary" fullWidth>
                  Enqueue
                </Button>
              )}
              {onDequeueStudent && (
                <Button onClick={onDequeueStudent} radius="md" size="md" bg="red" fullWidth>
                  Remove
                </Button>
              )}
            </div>
          </Flex>
        ) : !isInQueue && isStudentCourse ? (
          <>
            <Flex align="flex-start" gap="xs">
              <Info size={14} className="mt-0.5" />
              <Text size="xs" c="dimmed" ta="center" fw={500} className="w-full">
                Please ask a CISCO officer to add you to the queue
              </Text>
            </Flex>
          </>
        ) : isInQueue && isStudentCourse && !hasError ? (
          <Flex align="flex-start" gap="xs">
            <Info size={14} className="mt-0.5" />
            <Text size="xs" c="dimmed" ta="center" fw={500} className="w-full">
              Please ask a CISCO officer to remove you from the queue
            </Text>
          </Flex>
        ) : null}
      </Flex>
    </Card>
  )
}

export default QueueCard
