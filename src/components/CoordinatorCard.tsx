import { Card, Center, Flex, Stack, Text, Title } from "@mantine/core"

import { ProgramEnum } from "../types/ProgramsEnum"
import { TeacherStatusEnum } from "../types/TeacherStatusEnum"
import QueueStatus from "./QueueStatus"

type CoordinatorProps = {
  coordinatorTeacher: string
  coordinatorStatus: TeacherStatusEnum
  coordinatorEmail: string
  studentProgram: ProgramEnum
}

const resolveProgramName = (studentProgram: ProgramEnum) => {
  switch (studentProgram) {
    case ProgramEnum.CS:
      return "Computer Science"
    case ProgramEnum.IT:
      return "Information Technology"
    case ProgramEnum.IS:
      return "Information Science"
    default:
      return "Invalid Value"
  }
}

export default function CoordinatorCard({
  coordinatorTeacher,
  coordinatorStatus,
  coordinatorEmail,
  studentProgram,
}: CoordinatorProps) {
  return (
    <Card shadow="sm" padding="lg" radius="lg" w="100%" maw="22rem">
      <Center>
        <Title size="h3" mb="md">
          Coordinator Information
        </Title>
      </Center>
      <Flex justify="space-between">
        <Stack gap="xs">
          <Text size="sm">Name:</Text>
          <Text size="sm">Status:</Text>
          <Text size="sm">Email:</Text>
          <Text size="sm">Program:</Text>
        </Stack>
        <Stack align="flex-end" gap="xs">
          <Text size="sm" c="darkGray">
            {coordinatorTeacher}
          </Text>
          <QueueStatus status={coordinatorStatus} teacher="" />
          <Text size="sm" c="darkGray">
            {coordinatorEmail}
          </Text>
          <Text size="sm" c="darkGray">
            {resolveProgramName(studentProgram)}
          </Text>
        </Stack>
      </Flex>
    </Card>
  )
}
