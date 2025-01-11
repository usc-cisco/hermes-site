import { Text } from "@mantine/core"
import { modals } from "@mantine/modals"

interface RevokeModalProps {
  onConfirm: () => void
}

const RevokeConfirmModal = {
  open: ({ onConfirm }: RevokeModalProps) => {
    return modals.openConfirmModal({
      title: "Remove from Queue",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to remove yourself from the queue? This action cannot be undone and you will lose your
          current position.
        </Text>
      ),
      labels: {
        confirm: "Remove",
        cancel: "Cancel",
      },
      confirmProps: {
        color: "red",
        radius: "md",
        styles: {
          root: {
            backgroundColor: "#FF5757",
            "&:hover": {
              backgroundColor: "#ff4242",
            },
          },
        },
      },
      cancelProps: {
        variant: "default",
        radius: "md",
        color: "gray",
        styles: {
          root: {
            color: "#666",
            borderColor: "#ddd",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          },
        },
      },
      styles: {
        header: {
          marginBottom: "0.5rem",
        },
        title: {
          fontWeight: 600,
        },
        close: {
          color: "black", // Set close button color to black
          "&:hover": {
            backgroundColor: "transparent", // Optional: Transparent background on hover
          },
        },
      },
      onCancel: () => console.log("Revoke Cancelled!"),
      onConfirm: () => {
        onConfirm()
        console.log("Remove from queue")
      },
    })
  },
}

export default RevokeConfirmModal
