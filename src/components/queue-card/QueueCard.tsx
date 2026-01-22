import React from "react"

import { Button, Card, Flex, Text } from "@mantine/core"
import { Info, Plus, Trash2 } from "lucide-react"

import { useAuth } from "../../contexts/AuthContext"
import { useQueue } from "../../contexts/QueueContext"
import { Student } from "../../types/entities/Student"
import { ProgramEnum } from "../../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../../types/enums/TeacherStatusEnum"
import { convertProgramEnumToCourseNameEnum } from "../../utils/convertProgramEnumToCourseNameEnum"
import CardLoader from "../layout/CardLoader"
import RevokeConfirmModal from "../user-info/RevokeConfirmModal"
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
}) => {
  const { course: jwtCourse } = useAuth()
  const { isInQueue, isFirstLoad, isLoading, hasError, handleEnqueue, handleDequeue } = useQueue()
  const course = convertProgramEnumToCourseNameEnum(program)

  const isStudentCourse = jwtCourse === course

  const isHeaderDisabled = isAdmin
    ? [TeacherStatusEnum.AWAY, TeacherStatusEnum.UNAVAILABLE].includes(status)
    : status === TeacherStatusEnum.UNAVAILABLE

  const isAdminControlsDisabled = status === TeacherStatusEnum.UNAVAILABLE

  const isEnqueueDisabled = [TeacherStatusEnum.CUTOFF, TeacherStatusEnum.UNAVAILABLE].includes(status)

  if (isFirstLoad && isLoading) return <CardLoader />

  return (
    <Card
      shadow="sm"
      padding="xl"
      radius="lg"
      maw="22rem"
      w="100%"
      className={className}
      style={{
        outline: isAdmin && status === TeacherStatusEnum.UNAVAILABLE ? "2px solid red" : "none",
        minHeight: "22rem",
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
            {onAddStudentToQueue && (
              <Button
                leftSection={<Plus size={16} />}
                onClick={onAddStudentToQueue}
                radius="md"
                size="md"
                bg="primary"
                fullWidth
              >
                Add Student to Queue
              </Button>
            )}
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
