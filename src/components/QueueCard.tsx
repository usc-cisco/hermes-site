import React from "react"

import { Card, Flex, Text, Title } from "@mantine/core"

import { ProgramEnum } from "../types/ProgramsEnum"
import { TeacherStatusEnum } from "../types/TeacherStatusEnum"
import QueueButton from "./QueueButton"
import QueueStatus from "./QueueStatus"

interface QueueCardProps {
  program: ProgramEnum
  current: number
  total: number
  status: TeacherStatusEnum
  teacher: string
}

const QueueCard: React.FC<QueueCardProps> = ({ program, current, total, status, teacher }) => {
  const disabled = status === TeacherStatusEnum.UNAVAILABLE

  const programName: string = program

  return (
    <Card shadow="sm" padding="lg" radius="lg" maw="22rem" w="100%">
      <Flex justify="center">
        <Title size="h3" c={disabled ? "darkGray" : "black"}>
          {programName}
        </Title>
      </Flex>
      <Flex direction="column" align="center" mt="lg" mb="xl" gap="md">
        <Text size="sm" c="darkGray">
          Currently serving
        </Text>
        <Flex align="flex-end" gap="0.5rem">
          <Text size="4rem" fw={700} c={disabled ? "darkGray" : "black"}>
            #{current}
          </Text>
          <Text c="darkGray" mb="0.2rem" fw={700}>
            /{total}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap="xs">
        <QueueStatus status={status} teacher={teacher} />
        <QueueButton
          handleClick={() => {
            alert("Button clicked!")
          }}
          disabled={disabled}
        />
      </Flex>
    </Card>
  )
}

export default QueueCard
