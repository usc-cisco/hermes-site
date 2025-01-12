import React from "react"

import { Card, Center, Flex, Text, Title } from "@mantine/core"

interface UserQueueInfoProps {
  userNumber: number | undefined
  current: number | undefined
  total: number | undefined
}

const UserQueueInfoCard: React.FC<UserQueueInfoProps> = ({ userNumber, current, total }) => {
  if (userNumber && current && userNumber < current) {
    return null
  }

  // Checks if the current priority number is the student's respective priority number
  const checkCurrentPriorityNumber = (currentNumber: number | undefined, userNumber: number | undefined) => {
    const currentStudentPriority = (
      <Text size="sm" fw={800} c="primary">
        {`${userNumber} (you)`}
      </Text>
    )

    if (currentNumber !== userNumber) {
      return currentNumber
    }

    return currentStudentPriority
  }

  return (
    <Card shadow="sm" padding="xl" radius="lg" maw="22rem" w="100%" className="border-4 border-primary">
      <Center>
        <Title size="h3" c="black" fw={600} mb="md">
          Your Information
        </Title>
      </Center>

      <Flex direction="column" align="center" className="">
        {/* User's Queue Number Info */}
        <Text size="md" c="darkGray" fw={400} mb="xs">
          Your Number
        </Text>
        <Text size="5rem" fw={700} mb="xl">
          {userNumber ?? "???"}
        </Text>

        {/* Currently Serving and Queue Size Info  */}
        <Flex direction="column" align="flex-start" w="90%" gap="xs">
          <Flex justify="space-between" w="100%">
            <Text size="sm" c="black">
              Currently Serving:
            </Text>
            <Text size="sm" fw={500} c="darkGray">
              {checkCurrentPriorityNumber(current, userNumber)}
            </Text>
          </Flex>
          <Flex justify="space-between" w="100%">
            <Text size="sm" c="black">
              Queue Size:
            </Text>
            <Text size="sm" fw={500} c="darkGray">
              {total ?? "???"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default UserQueueInfoCard
