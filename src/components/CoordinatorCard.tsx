import { Card, Flex, Stack, Text, Title } from "@mantine/core"

import { TeacherStatusEnum } from "../types/TeacherStatusEnum"
import QueueStatus from "./QueueStatus"

export default function CoordinatorCard() {
  return (
    <Card shadow="sm" padding="lg" radius="lg" w="100%">
      <Title size="h3">Coordinator Information</Title>
      <Flex justify="space-between">
        <Stack>
          <Text size="sm">Name:</Text>
          <Text size="sm">Status:</Text>
          <Text size="sm">Email:</Text>
          <Text size="sm">Program:</Text>
        </Stack>
        <Stack align="flex-end">
          <Text size="sm">Doriz Roa</Text>
          <QueueStatus status={TeacherStatusEnum.UNAVAILABLE} teacher="" />
          {/* <Text size="sm">Unavailable</Text> */}
          <Text size="sm">dorix.roa@usc.edu.ph</Text>
          <Text size="sm">Computer Science</Text>
        </Stack>
      </Flex>
    </Card>
  )
}
