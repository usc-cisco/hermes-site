import { Card, Center, Flex, Stack, Text, Title } from "@mantine/core"
import useSWR from "swr"

import { CoordinatorService } from "../services/coordinator.service"
import { Coordinator } from "../types/entities/Coordinator"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import QueueStatus from "./QueueStatus"

// Resolves and returns the proper program name based on fetched 'courseName' from backend
const resolveProgramName = (program: string) => {
  switch (program) {
    case "BSCS":
      return "Computer Science"
    case "BSIT":
      return "Information Technology"
    case "BSIS":
      return "Information Science"
    default:
      return "Invalid Value"
  }
}

// Resolves and returns the proper Enum value based on fetched 'status' from backend
const resolveStatusEnum = (status: string) => {
  switch (status) {
    case "available":
      return TeacherStatusEnum.AVAILABLE
    case "away":
      return TeacherStatusEnum.AWAY
    case "unavailable":
      return TeacherStatusEnum.UNAVAILABLE
    default:
      return TeacherStatusEnum.UNAVAILABLE
  }
}

const fetcher = async (course: CourseNameEnum) => {
  const data = await CoordinatorService.getCoordinatorInfo(course)
  console.log(data)
  return data
}

export default function CoordinatorCard(course: CourseNameEnum) {
  const { data, error } = useSWR(course, fetcher, {
    refreshInterval: 1000,
  })

  if (error) {
    console.error("Error fetching coordinator info:", error)
    return (
      <Card shadow="sm" padding="lg" radius="lg" w="100%" maw="22rem">
        <Center>
          <Text fw={500} c="red">
            Error loading coordinator info.
          </Text>
        </Center>
      </Card>
    )
  }

  // Load State
  if (!data) {
    return <Text>Fetching coordinator info...</Text>
  }

  const coordinatorInfo: Coordinator = data

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
    </Card>
  )
}
