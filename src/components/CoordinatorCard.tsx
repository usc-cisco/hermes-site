import { Card, Flex, Stack, Text, Title } from "@mantine/core"

import { TeacherStatusEnum } from "../types/TeacherStatusEnum"
import QueueStatus from "./QueueStatus"

export default function CoordinatorCard() {
  return (
    <Card shadow="sm" padding="lg" radius="lg" w="100%" maw="22rem">
      <Title size="h3" mb="md">
        Coordinator Information
      </Title>
      <Flex justify="space-between">
        <Stack gap="xs">
          <Text size="sm">Name:</Text>
          <Text size="sm">Status:</Text>
          <Text size="sm">Email:</Text>
          <Text size="sm">Program:</Text>
        </Stack>
        <Stack align="flex-end" gap="xs">
          <Text size="sm" c="darkGray">
            Doriz Roa
          </Text>
          <QueueStatus status={TeacherStatusEnum.UNAVAILABLE} teacher="" />
          {/* <Text size="sm">Unavailable</Text> */}
          <Text size="sm" c="darkGray">
            dorix.roa@usc.edu.ph
          </Text>
          <Text size="sm" c="darkGray">
            Computer Science
          </Text>
        </Stack>
      </Flex>
    </Card>
  )
}
