import React from "react"

import { Button } from "@mantine/core"

interface QueueButtonProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  label?: string //Optional, used if provided
  fullWidth?: boolean //Styling prop depending on user view
  buttonSize?: string
}

const QueueButton: React.FC<QueueButtonProps> = ({
  buttonSize,
  fullWidth = true,
  label,
  disabled = false,
  handleClick,
}) => {
  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      fullWidth={fullWidth}
      radius="md"
      size={buttonSize}
      c={disabled ? "darkGray" : "white"}
      bg={disabled ? "gray" : "primary"}
    >
      {label || (disabled ? "Cannot join queue" : "Join queue")}
    </Button>
  )
}

export default QueueButton