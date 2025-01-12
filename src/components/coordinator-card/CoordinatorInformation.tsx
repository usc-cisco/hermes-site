import { Flex, Stack, Text } from "@mantine/core"

import { Coordinator } from "../../types/entities/Coordinator"
import { resolveProgramName } from "../../utils/resolveProgramName"
import { resolveStatusEnum } from "../../utils/resolveStatusEnum"
import QueueStatus from "../queue-card/QueueStatus"

interface CoordinatorInformationProps {
  coordinatorInfo: Coordinator
}

export default function CoordinatorInformation({ coordinatorInfo }: CoordinatorInformationProps) {
  return (
    <Flex justify="space-between">
      <Stack gap="xs">
        <Text size="sm">Name:</Text>
        <Text size="sm">Status:</Text>
        <Text size="sm">Email:</Text>
        <Text size="sm">Program:</Text>
      </Stack>
      <Stack align="flex-end" gap="xs">
        <Text size="sm" c="darkGray">
          {coordinatorInfo?.name}
        </Text>
        <QueueStatus status={resolveStatusEnum(coordinatorInfo?.status)} teacher="" />
        <Text size="sm" c="darkGray">
          {coordinatorInfo?.email}
        </Text>
        <Text size="sm" c="darkGray">
          {resolveProgramName(coordinatorInfo?.courseName)}
        </Text>
      </Stack>
    </Flex>
  )
}
