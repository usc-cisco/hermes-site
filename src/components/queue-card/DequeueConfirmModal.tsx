import { Text } from "@mantine/core"
import { modals } from "@mantine/modals"

interface DequeueConfirmModalProps {
  onConfirm: () => void
}

const DequeueConfirmModal = {
  open: ({ onConfirm }: DequeueConfirmModalProps) => {
    return modals.openConfirmModal({
      title: "Remove from Queue",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to remove this student from the queue? This action cannot be undone</Text>
      ),
      labels: {
        confirm: "Dequeue Student",
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
      onConfirm: () => {
        onConfirm()
      },
    })
  },
}

export default DequeueConfirmModal
