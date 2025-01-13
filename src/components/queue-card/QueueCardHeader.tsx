import React from "react"

import { Flex, Text, Title } from "@mantine/core"

import { ProgramEnum } from "../../types/enums/ProgramsEnum"

interface QueueCardHeaderProps {
  program: ProgramEnum
  current: number
  total: number
  disabled: boolean
}

const QueueCardHeader: React.FC<QueueCardHeaderProps> = ({ program, current, disabled, total }) => {
  const programName: string = program

  return (
    <>
      <Flex justify="center" direction="column" align="center" mb="lg">
        <Title size="h1" c={disabled ? "darkGray" : "#4a4c51"}>
          {programName}
        </Title>{" "}
        <Text size="sm" c="darkGray">
          Currently serving
        </Text>
      </Flex>
      <Flex direction="column" align="center" gap="md">
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
