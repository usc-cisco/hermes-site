import { Text } from "@mantine/core"
import { modals } from "@mantine/modals"

interface DeleteAnnouncementConfirmModalProps {
  onConfirm: () => void
}

const DeleteAnnouncementConfirmModal = {
  open: ({ onConfirm }: DeleteAnnouncementConfirmModalProps) => {
    return modals.openConfirmModal({
      title: "Delete Announcement",
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this announcement? This action cannot be undone.</Text>,
      labels: {
        confirm: "Delete",
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
          color: "black",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      onConfirm: () => {
        onConfirm()
      },
    })
  },
}

export default DeleteAnnouncementConfirmModal
