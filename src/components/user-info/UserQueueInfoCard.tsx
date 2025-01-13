import React from "react"

import { Card, Center, Flex, Text, Title } from "@mantine/core"
import useSound from "use-sound"

import queueNotif from "/cisco-queue-notif.mp3"

interface UserQueueInfoProps {
  userNumber: number | undefined
  current: number | undefined
  total: number | undefined
}

const UserQueueInfoCard: React.FC<UserQueueInfoProps> = ({ userNumber, current, total }) => {
  const [play, stop] = useSound(queueNotif)
  function playNotification() {
    new Audio(queueNotif).play()
  }

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
    // Play the sound effect once student priority is current priority
    // playNotification()
    play()
    return currentStudentPriority
  }

  return (
    <Card
      shadow="sm"
      padding="xl"
      radius="lg"
      maw="22rem"
      w="100%"
      className={current === userNumber ? "border-4 border-primary" : ""}
    >
      <Center>
        <Title size="h3" c="black" fw={600} mb="md">
          Your Information
        </Title>
      </Center>

      <Flex direction="column" align="center" className="">
        {/* User's Queue Number Info */}

        <Text size="6rem" fw={700} mb="md">
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
