import React from "react"

import { Button, Card, Flex } from "@mantine/core"
import { Trash2 } from "lucide-react"

import { useAuth } from "../../contexts/AuthContext"
import { useQueue } from "../../contexts/QueueContext"
import { ProgramEnum } from "../../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../../types/enums/TeacherStatusEnum"
import { convertProgramEnumToCourseNameEnum } from "../../utils/convertProgramEnumToCourseNameEnum"
import CardLoader from "../layout/CardLoader"
import RevokeConfirmModal from "../user-info/RevokeConfirmModal"
import AdminControls from "./AdminControls"
import QueueButton from "./QueueButton"
import QueueCardHeader from "./QueueCardHeader"
import QueueStatus from "./QueueStatus"

interface QueueCardProps {
  program: ProgramEnum
  current: number
  currentStudentId: string | null
  total: number
  status: TeacherStatusEnum
  teacher: string
  onUpdateQueue?: () => void
  onStatusChange?: (value: TeacherStatusEnum) => void
  isAdmin?: boolean
}

const QueueCard: React.FC<QueueCardProps> = ({
  program,
  current,
  currentStudentId,
  total,
  status,
  teacher,
  onUpdateQueue,
  onStatusChange,
  isAdmin = false,
}) => {
  const { course: jwtCourse } = useAuth()
  const { isInQueue, isFirstLoad, isLoading, hasError, handleEnqueue, handleDequeue } = useQueue()
  const course = convertProgramEnumToCourseNameEnum(program)

  const isStudentCourse = jwtCourse === course

  const disabled = isAdmin
    ? status === TeacherStatusEnum.AWAY || status === TeacherStatusEnum.UNAVAILABLE
    : status === TeacherStatusEnum.UNAVAILABLE

  if (isFirstLoad && isLoading) return <CardLoader />

  return (
    <Card
      shadow="sm"
      padding="xl"
      radius="lg"
      maw="22rem"
      w="100%"
      style={{
        outline: isAdmin && status === TeacherStatusEnum.UNAVAILABLE ? "2px solid red" : "none",
      }}
    >
      <QueueCardHeader
        isAdmin={isAdmin}
        program={program}
        current={current}
        total={total}
        disabled={disabled}
        currentStudentId={currentStudentId}
      />

      <Flex direction="column" gap="xl" mt="md">
        <QueueStatus status={status} teacher={teacher} />

        {isAdmin ? (
          <Flex direction="column" gap="md">
            <AdminControls
              status={status}
              disabled={disabled}
              onUpdateQueue={onUpdateQueue}
              onStatusChange={onStatusChange}
            />
          </Flex>
        ) : !isInQueue && isStudentCourse ? (
          <QueueButton handleClick={() => handleEnqueue(course)} disabled={disabled} buttonSize="md" />
        ) : null}

        {isInQueue && isStudentCourse && !hasError ? (
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
