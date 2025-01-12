import React from "react"

import { Card, Flex, Text, Title } from "@mantine/core"

interface UserQueueInfoProps {
  userNumber: number | undefined
  current: number | undefined
  total: number | undefined
}

const UserQueueInfoCard: React.FC<UserQueueInfoProps> = ({ userNumber, current, total }) => {
  if (userNumber && current && userNumber < current) {
    return null
  }

  return (
    <Card shadow="sm" radius="lg" maw="22rem" w="100%" padding="xl">
      <Flex justify="center" direction="column" align="center" mb="md">
        <Title size="h3" c="#4a4c51" fw={600}>
          Your Information
        </Title>
        <Text size="md" c="darkGray" fw={400}>
          Your Number
        </Text>
      </Flex>
      <Flex direction="column" align="center">
        {/* User's Queue Number Info */}

        <Text size="6rem" fw={700} c="#002363" mb="md">
          {userNumber ?? "???"}
        </Text>

        {/* Currently Serving and Queue Size Info  */}
        <Flex direction="column" align="flex-start" w="50%" gap="xs">
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
