import React from "react"

import { Card, Flex } from "@mantine/core"
import { Loader } from "@mantine/core"

import { useAuth } from "../../contexts/AuthContext"
import { useStudentQueueData } from "../../hooks/useStudentQueueData"
import { ProgramEnum } from "../../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../../types/enums/TeacherStatusEnum"
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
  const { jwtToken } = useAuth()

  const { studentQueueData } = useStudentQueueData(jwtToken as string)

  const disabled = isAdmin
    ? status === TeacherStatusEnum.AWAY || status === TeacherStatusEnum.UNAVAILABLE // Correctly check both statuses
    : status === TeacherStatusEnum.UNAVAILABLE

  if (!studentQueueData.data)
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
        ) : (
          <QueueButton
            handleClick={() => {
              alert("Join Queue Button clicked!")
            }}
            disabled={disabled}
            buttonSize="md"
          />
        )}
      </Flex>
    </Card>
  )
}

export default QueueCard
