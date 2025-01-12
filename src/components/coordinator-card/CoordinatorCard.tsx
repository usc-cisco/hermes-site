import { Card, Center, Text, Title } from "@mantine/core"
import useSWR from "swr"

import { CoordinatorService } from "../../services/coordinator.service"
import { POLLING_INTERVAL } from "../../types/constants/polling-interval"
import { Coordinator } from "../../types/entities/Coordinator"
import { CourseNameEnum } from "../../types/enums/CourseNameEnum"
import CoordinatorInformation from "./CoordinatorInformation"

interface CoordinatorCardProps {
  course: CourseNameEnum
}

const fetcher = async (course: CourseNameEnum) => {
  const data = await CoordinatorService.getCoordinatorInfo(course)

  return data
}

export default function CoordinatorCard({ course }: CoordinatorCardProps) {
  const { data, error } = useSWR(course, fetcher, {
    refreshInterval: POLLING_INTERVAL,
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
      <CoordinatorInformation coordinatorInfo={coordinatorInfo} />
    </Card>
  )
}
