import { useEffect } from "react"

import { Card, Center, Flex, Stack, Text, Title } from "@mantine/core"

import { CoordinatorService } from "../services/coordinator.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
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
  useEffect(() => {
    async function pollForCoordinatorInfo() {
      try {
        // Fetch data with axios
        const data = await CoordinatorService.getCoordinatorInfo(CourseNameEnum.BSCS)
        // If data is present, update state
        // If data is not present, setTimer in
      } catch (error) {
        console.log(error)
        throw new Error("Something went wrong!")
      }
    }
  })
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
