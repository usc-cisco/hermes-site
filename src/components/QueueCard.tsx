import React from "react"

import { Card, Flex, Text, Title } from "@mantine/core"

import { TeacherStatus } from "../types/TeacherStatus"
import QueueButton from "./QueueButton"
import QueueStatus from "./QueueStatus"

interface QueueCardProps {
  course: string
  current: number
  total: number
  status: TeacherStatus
  teacher: string
}

const QueueCard: React.FC<QueueCardProps> = ({ course, current, total, status, teacher }) => {
  const disabled = status === TeacherStatus.UNAVAILABLE

  return (
    <Card shadow="sm" padding="lg" radius="lg" maw="22rem" w="100%">
      <Flex justify="center">
        <Title size="h3" c={disabled ? "#ADB5BD" : "black"}>
          {course}
        </Title>
      </Flex>
      <Flex direction="column" align="center" mt="lg" mb="xl" gap="md">
        <Text size="sm" c="gray">
          Currently serving
        </Text>
        <Flex align="flex-end" gap="0.5rem">
          <Text size="4rem" fw={700} c={disabled ? "#ADB5BD" : "black"}>
            #{current}
          </Text>
          <Text c="#ADB5BD" mb="0.2rem" fw={700}>
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
