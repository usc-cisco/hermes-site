import { useEffect, useState } from "react"

import { Card, Center, Flex, Stack, Text, Title } from "@mantine/core"

import { CoordinatorService } from "../services/coordinator.service"
import { Coordinator } from "../types/entities/Coordinator"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import QueueStatus from "./QueueStatus"

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

export default function CoordinatorCard() {
  const [coordinatorInfo, setCoordinatorInfo] = useState<Coordinator>({
    id: -1,
    name: "",
    courseName: "",
    status: "unavailable",
    email: "",
  })

  useEffect(() => {
    async function pollForCoordinatorInfo() {
      try {
        console.log("Polling started...")
        const data = await CoordinatorService.getCoordinatorInfo(CourseNameEnum.BSCS)
        if (!data) return
        console.log(data)
        setCoordinatorInfo({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    pollForCoordinatorInfo()

    const intervalId = setInterval(pollForCoordinatorInfo, 1000)

    return () => {
      console.log("Polling stopped...")
      clearInterval(intervalId)
    }
  }, [])

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
          <QueueStatus status={coordinatorInfo.status} teacher="" />
          <Text size="sm" c="darkGray">
            {coordinatorInfo.email}
          </Text>
          <Text size="sm" c="darkGray">
            Missing student program
            {/* {resolveProgramName(studentProgram)} */}
          </Text>
        </Stack>
      </Flex>
    </Card>
  )
}
