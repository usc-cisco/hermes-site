import React from "react"

import { Card, Flex, Select, Text, Title } from "@mantine/core"
import { ChevronDown } from "lucide-react"

import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import QueueButton from "./QueueButton"
import QueueStatus from "./QueueStatus"

interface QueueCardProps {
  program: ProgramEnum
  current: number
  total: number
  status: TeacherStatusEnum
  teacher: string
  onUpdateQueue?: () => void //Optional as it will be for Admin users
  onStatusChange?: (value: TeacherStatusEnum) => void //Function to handle status change
  isAdmin?: boolean //Checks if current user is admin
}

const QueueCard: React.FC<QueueCardProps> = ({
  program,
  current,
  total,
  status,
  teacher,
  onUpdateQueue,
  onStatusChange,
  isAdmin = false,
}) => {
  const disabled = isAdmin
    ? status === TeacherStatusEnum.AWAY || status === TeacherStatusEnum.UNAVAILABLE // Correctly check both statuses
    : status === TeacherStatusEnum.UNAVAILABLE

  const programName: string = program

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      maw="22rem"
      w="100%"
      style={{
        outline: isAdmin && status === TeacherStatusEnum.UNAVAILABLE ? "2px solid red" : "none",
      }}
    >
      <Flex justify="center">
        <Title size="h3" c={disabled ? "darkGray" : "black"}>
          {programName}
        </Title>
      </Flex>
      <Flex direction="column" align="center" mt="lg" mb="xs" gap="md">
        <Text size="sm" c="darkGray">
          Currently serving
        </Text>
        <Flex align="flex-end" gap="0.1rem">
          <Text size="4rem" fw={700} c={disabled ? "darkGray" : "black"}>
            {current}
          </Text>
          <Text c="darkGray" mb="0.2rem" fw={700}>
            / {total}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap="xs">
        <QueueStatus status={status} teacher={teacher} />

        {/* If Admin User, render admin controls. Else, render join queue button only*/}
        {isAdmin ? (
          <Flex direction="row" gap="xs" justify="space-between" w="100%">
            <QueueButton
              handleClick={onUpdateQueue || (() => {})}
              label="Update Queue"
              disabled={disabled}
              fullWidth={false}
              buttonSize="s"
            />
            <Select
              placeholder="Update Status"
              data={[
                { value: TeacherStatusEnum.AVAILABLE.toString(), label: "Available" },
                { value: TeacherStatusEnum.AWAY.toString(), label: "Away" },
                { value: TeacherStatusEnum.UNAVAILABLE.toString(), label: "Unavailable" },
              ]}
              onChange={(value) => {
                if (onStatusChange && value) {
                  //Converts the string value back to TeacherStatusEnum
                  const statusValue = parseInt(value as string) as TeacherStatusEnum
                  onStatusChange(statusValue)
                }
              }}
              value={status.toString()} //Ensures the value is a string
              radius="md"
              style={{ width: "150px", height: "40px" }}
              rightSection={
                <span style={{ color: "grey" }}>
                  <ChevronDown />
                </span>
              }
            />
          </Flex>
        ) : (
          <QueueButton
            handleClick={() => {
              alert("Join Queue Button clicked!")
            }}
            disabled={disabled}
            buttonSize="md"
          />
        )}
      </Flex>
    </Card>
  )
}

export default QueueCard
