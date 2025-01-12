import React from "react"

import { Card, Flex, Text, Title } from "@mantine/core"

interface UserQueueInfoProps {
  userNumber: number | undefined
  current: number | undefined
  total: number | undefined
}

const UserQueueInfoCard: React.FC<UserQueueInfoProps> = ({ userNumber, current, total }) => {
  return (
    <Card shadow="sm" padding="lg" radius="lg" maw="22rem" w="100%">
      <Flex justify="center">
        <Title size="h3" c="black" fw={600} mb="md">
          Your Information
        </Title>
      </Flex>
      <Flex direction="column" align="center">
        {/* User's Queue Number Info */}
        <Text size="md" c="darkGray" fw={400} mb="xs">
          Your Number
        </Text>
        <Text size="5rem" fw={700} mb="xl">
          {userNumber ?? "???"}
        </Text>

        {/* Currently Serving and Queue Size Info  */}
        <Flex direction="column" align="flex-start" w="50%" gap="xs" mb="xl">
          <Flex justify="space-between" w="100%">
            <Text size="sm" c="black">
              Currently Serving:
            </Text>
            <Text size="sm" fw={500}>
              {current ?? "???"}
            </Text>
          </Flex>
          <Flex justify="space-between" w="100%">
            <Text size="sm" c="black">
              Queue Size:
            </Text>
            <Text size="sm" fw={500}>
              {total ?? "???"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default UserQueueInfoCard
