import React from "react"

import { Button } from "@mantine/core"

interface QueueButtonProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const QueueButton: React.FC<QueueButtonProps> = ({ disabled = false, handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      fullWidth
      radius="md"
      size="md"
      bg={disabled ? "#E9ECEF" : "#1752F0"}
    >
      {disabled ? "Cannot join queue" : "Join queue"}
    </Button>
  )
}

export default QueueButton
