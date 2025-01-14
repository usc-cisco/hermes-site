import React from "react"

import { Flex, Text, Title } from "@mantine/core"

import { Student } from "../../types/entities/Student"
import { ProgramEnum } from "../../types/enums/ProgramsEnum"
import CurrentStudent from "./CurrentStudent"

interface QueueCardHeaderProps {
  program: ProgramEnum
  current: number
  total: number
  disabled: boolean
  currentStudent?: Student | null
  isAdmin: boolean
  isShowingCurrentName?: boolean
}

const QueueCardHeader: React.FC<QueueCardHeaderProps> = ({
  program,
  current,
  disabled,
  total,
  isAdmin,
  currentStudent,
  isShowingCurrentName,
}) => {
  const programName: string = program

  return (
    <>
      <Flex justify="center" direction="column" align="center" mb="sm">
        <Title size="h1" c={disabled ? "darkGray" : "#4a4c51"}>
          {programName}
        </Title>
        <Text size="sm" c="gray.3">
          {isShowingCurrentName ? (
            currentStudent?.name
          ) : isAdmin ? (
            <CurrentStudent currentStudent={currentStudent ?? null} />
          ) : (
            "Currently serving"
          )}
        </Text>
      </Flex>
      <Flex direction="column" align="center" mb="xs" gap="md">
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
