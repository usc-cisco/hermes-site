// If currentPriority === studentPriority,
// play sound
// display DisclaimerModal.tsx
import React, { useEffect, useState } from "react"

import { List, Text } from "@mantine/core"
import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

type DisclaimerModalProps = {
  currentPriority?: number
  studentPriority?: number
  maxPrioritySize: number
}

export default function DisclaimerModal({ currentPriority, studentPriority, maxPrioritySize }: DisclaimerModalProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const [hasShownDisclaimer, setHasShownDisclaimer] = useState(() => {
    return localStorage.getItem("hasShownDisclaimer") === "true"
  })

  useEffect(() => {
    if (currentPriority === studentPriority && !hasShownDisclaimer) {
      setHasShownDisclaimer(true)
      localStorage.setItem("hasShownDisclaimer", "true")
      open()
    }
  }, [currentPriority, studentPriority, open, close, maxPrioritySize, hasShownDisclaimer])

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <Text>You have joined CS queue!</Text>
        <Text>DISCLAIMER:</Text>
        <Text>Introduction</Text>
        <List>Bulleted list</List>
        <Button variant="default" onClick={close}>
          {`I understood what I've read`}
        </Button>
      </Modal>
    </>
  )
}
