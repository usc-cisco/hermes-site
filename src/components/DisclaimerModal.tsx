import React, { useEffect, useState } from "react"

import { Button, Center, Flex, List, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import useSound from "use-sound"

import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import queueNotif from "/cisco-queue-notif.mp3"

type DisclaimerModalProps = {
  currentPriority?: number
  studentPriority?: number
  maxPrioritySize?: number
  studentCourseName?: CourseNameEnum
}

export default function DisclaimerModal({ currentPriority, studentPriority, maxPrioritySize }: DisclaimerModalProps) {
  const [play] = useSound(queueNotif)

  const [opened, { open, close }] = useDisclosure(false)
  const [hasShownDisclaimer, setHasShownDisclaimer] = useState(() => {
    return localStorage.getItem("hasShownDisclaimer") === "true"
  })

  useEffect(() => {
    // Sets to true once student joins a queue for the very first time
    if (maxPrioritySize !== undefined && currentPriority !== studentPriority && !hasShownDisclaimer) {
      open()
      localStorage.setItem("hasShownDisclaimer", "true")
      setHasShownDisclaimer(true)
    }
  }, [currentPriority, studentPriority, hasShownDisclaimer, open, close, maxPrioritySize, play])

  // Upon closing the disclaimer modal, students won't receive the disclaimer modal anymore.
  const handleClose = () => {
    close()
    localStorage.setItem("hasShownDisclaimer", "true")
    setHasShownDisclaimer(true)
  }

  return (
    <>
      <Modal opened={opened} onClose={handleClose} centered withCloseButton={false} radius="lg">
        <Center>
          <Text size="xl" fw="700">
            DISCLAIMER
          </Text>
        </Center>
        <Flex direction="column" gap="sm">
          <Text>
            In order to ensure that everyone&apos;s enrollment concerns will be fairly catered to, please adhere to the
            following rules.
          </Text>

          <List spacing="md">
            <List.Item>
              Please be watchful of the queue&apos;s status to ensure that your priority number won&apos;t be skipped.{" "}
            </List.Item>
            <List.Item>
              If you do not respond after your name has been called{" "}
              <span className="font-semibold text-red-500">3 times,</span> your priority number will{" "}
              <span className="font-semibold text-red-500">STRICTLY and AUTOMATICALLY be skipped.</span>
            </List.Item>
            <List.Item>
              Students are expected to hold the responsibility of showing up when it is their turn in the queue. If you
              have your priority number skipped due to irresponsibility,{" "}
              <span className="font-semibold text-red-500">you will have to queue up for another priority number.</span>
            </List.Item>
            <List.Item>
              Lastly, clicking the button below would mean that you have read and therefore will agree and strictly
              abide to the list of rules and policies that we, CISCO and the Department, have displayed to you, the
              students, through this disclaimer. With that said, CISCO and the Department will not be held responsible
              for any priority numbers getting skipped unless a valid reason will be presented.
            </List.Item>
          </List>

          <Center>
            <Button onClick={close} radius="md" w="100%" size="lg" c="white" bg="primary">
              I understand what I&apos;ve read
            </Button>
          </Center>
        </Flex>
      </Modal>
    </>
  )
}
