import { Card, Center, Flex, Stack, Text, Title } from "@mantine/core"
import useSWR from "swr"

import { CoordinatorService } from "../services/coordinator.service"
import { Coordinator } from "../types/entities/Coordinator"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import QueueStatus from "./QueueStatus"

// Function to resolve program names
const resolveProgramName = (studentProgram: string) => {
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

// Fetcher function for SWR
const fetcher = async (course: CourseNameEnum) => {
  const data = await CoordinatorService.getCoordinatorInfo(course)
  console.log(data)
  return data
}

export default function CoordinatorCard() {
  const { data, error } = useSWR(CourseNameEnum.BSCS, fetcher, {
    refreshInterval: 1000,
  })

  // Log data and error for debugging
  console.log("Fetched data:", data)
  if (error) {
    console.error("Error fetching coordinator info:", error)
    return <Text>Error loading coordinator info.</Text>
  }

  // Check if data is still loading
  if (!data) {
    return <Text>Fetching coordinator info...</Text>
  }

  // Use the fetched data directly
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
            {coordinatorInfo.name}
          </Text>
          <QueueStatus status={resolveStatusEnum(coordinatorInfo.status)} teacher="" />
          <Text size="sm" c="darkGray">
            {coordinatorInfo.email}
          </Text>
          <Text size="sm" c="darkGray">
            {resolveProgramName(coordinatorInfo.courseName)} {/* Assuming courseName is part of coordinatorInfo */}
          </Text>
        </Stack>
      </Flex>
    </Card>
  )
}
