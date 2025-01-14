import React, { useEffect, useRef } from "react"

import { Card, Center, Flex, Text, Title } from "@mantine/core"
import useSound from "use-sound"

import { useAuth } from "../../contexts/AuthContext"
import { useQueue } from "../../contexts/QueueContext"
import { CourseNameEnum } from "../../types/enums/CourseNameEnum"
import queueNotif from "/cisco-queue-notif.mp3"

interface UserQueueInfoProps {
  userNumber: number | undefined
  current: number | undefined
  total: number | undefined
  course: CourseNameEnum
}

const UserQueueInfoCard: React.FC<UserQueueInfoProps> = ({ userNumber, current, total, course }) => {
  const [play] = useSound(queueNotif)
  const previousCurrentRef = useRef<number | undefined>()
  const { submittedCourse } = useAuth()
  const { isInQueue } = useQueue()

  useEffect(() => {
    // Only play notification when current number changes TO the user's number
    if (isInQueue && current === userNumber && previousCurrentRef.current !== current && submittedCourse === course) {
      play()
    }
    previousCurrentRef.current = current
  }, [current, userNumber, play, isInQueue, course, submittedCourse])

  if (userNumber && current && userNumber < current) {
    return null
  }

  const checkCurrentPriorityNumber = (currentNumber: number | undefined, userNumber: number | undefined) => {
    if (currentNumber !== userNumber) {
      return currentNumber
    }
    return (
      <Text size="sm" fw={800} c="primary">
        {`${userNumber} (you)`}
      </Text>
    )
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
        <Text size="6rem" fw={700} mb="md">
          {userNumber ?? "???"}
        </Text>
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
