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
      <Flex justify="center">
        <Title size="h3" c={disabled ? "darkGray" : "black"}>
          {programName}
        </Title>
      </Flex>
      <Flex direction="column" align="center" mt="lg" mb="xs" gap="md">
        <Text size="sm" c="darkGray">
          Currently serving
        </Text>
        <Flex align="flex-end" gap="0.1rem">
          <Text size="4rem" fw={700} c={disabled ? "darkGray" : "black"}>
            {current}
          </Text>
          <Text c="darkGray" mb="0.2rem" fw={700}>
            / {total}
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default QueueCardHeader
