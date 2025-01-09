import React from "react"

import { Card, Flex, Text } from "@mantine/core"

import { TeacherStatusEnum } from "../types/TeacherStatusEnum"

interface IStatus {
  label: string
  color: string
  disabled: boolean
}

interface StatusProps {
  status: TeacherStatusEnum
  teacher: string
}

const QueueStatus: React.FC<StatusProps> = ({ status, teacher }) => {
  let s: IStatus = {
    label: "",
    color: "",
    disabled: false,
  }

  switch (status) {
    case TeacherStatusEnum.AVAILABLE:
      s = {
        ...s,
        label: "Available",
        color: "#12B886",
      }
      break
    case TeacherStatusEnum.AWAY:
      s = {
        ...s,
        label: "Away",
        color: "#FAB005",
      }
      break
    case TeacherStatusEnum.UNAVAILABLE:
      s = {
        label: "Unavailable",
        color: "#FA5252",
        disabled: true,
      }
      break
  }

  return (
    <Flex align="center" justify="center" gap="xs">
      <Card py="0.05rem" px="0.7rem" radius="xl" bg={s.color} c="white">
        <Text size="xs" fw={600}>
          {s.label.toUpperCase()}
        </Text>
      </Card>
      <Text size="xs" fw={600} c={s.disabled ? s.color : "black"}>
        {teacher.toUpperCase()}
      </Text>
    </Flex>
  )
}

export default QueueStatus
