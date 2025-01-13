import React from "react"

import { Flex, Text, Title } from "@mantine/core"

import { ProgramEnum } from "../../types/enums/ProgramsEnum"
import CurrentStudent from "./CurrentStudent"

interface QueueCardHeaderProps {
  program: ProgramEnum
  current: number
  total: number
  disabled: boolean
  currentStudentId?: string | null
  isAdmin: boolean
}

const QueueCardHeader: React.FC<QueueCardHeaderProps> = ({
  program,
  current,
  disabled,
  total,
  currentStudentId,
  isAdmin,
}) => {
  const programName: string = program

  return (
    <>
      <Flex justify="center" direction="column" align="center" mb="lg">
        <Title size="h1" c={disabled ? "darkGray" : "#4a4c51"}>
          {programName}
        </Title>
      </Flex>
      <Flex direction="column" align="center" mt={isAdmin ? "xs" : "lg"} mb="xs" gap="md">
        <Flex direction="column" align="center">
          <Text size="xs" c="gray.3">
            Currently serving
          </Text>
          {isAdmin && currentStudentId && <CurrentStudent currentStudentId={currentStudentId} />}
        </Flex>
        <Flex align="flex-end" gap="0.1rem">
          <Text size="6rem" fw={700} c={disabled ? "darkGray" : "black"}>
            {current}
          </Text>
          <Text c="darkGray" mb="0.6rem" fw={700}>
            / {total}
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default QueueCardHeader
