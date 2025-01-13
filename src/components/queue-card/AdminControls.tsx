import React from "react"

import { Flex, Select } from "@mantine/core"
import { ChevronDown } from "lucide-react"

import { TeacherStatusEnum } from "../../types/enums/TeacherStatusEnum"
import DequeueConfirmModal from "./DequeueConfirmModal"
import QueueButton from "./QueueButton"

interface AdminControlsProps {
  disabled: boolean
  status: TeacherStatusEnum

  onUpdateQueue?: () => void //Optional as it will be for Admin users
  onStatusChange?: (value: TeacherStatusEnum) => void //Function to handle status change
}

const AdminControls: React.FC<AdminControlsProps> = ({ status, disabled, onUpdateQueue, onStatusChange }) => {
  let openConfirmationModal

  if (onUpdateQueue) {
    openConfirmationModal = () => {
      DequeueConfirmModal.open({ onConfirm: () => onUpdateQueue() })
    }
  }

  return (
    <Flex direction="row" gap="xs" justify="space-between" w="100%">
      <QueueButton
        handleClick={openConfirmationModal || (() => {})}
        label="Advance"
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
  )
}

export default AdminControls
