import React from "react"

import { Button } from "@mantine/core"
import { Trash2 } from "lucide-react"

interface RevokeButtonProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
}

const RevokeButton: React.FC<RevokeButtonProps> = ({ handleClick }) => {
  return (
    <Button onClick={handleClick} fullWidth radius="md" size="md" c="white" bg="red" leftSection={<Trash2 size={16} />}>
      Revoke
    </Button>
  )
}

export default RevokeButton
