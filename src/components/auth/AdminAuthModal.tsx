import { Button, Paper, Select, Text, TextInput } from "@mantine/core"
import { modals } from "@mantine/modals"

interface RevokeModalProps {
  onConfirm: () => void
}

const AdminAuthModal = {
  open: ({ onConfirm }: RevokeModalProps) => {
    return modals.openConfirmModal({
      title: "Remove from Queue",
      centered: true,
      children: (
        <div>
          <TextInput
            style={{
              input: {
                "&::placeholder": {
                  color: "black",
                },
              },
            }}
            label="Student ID"
            placeholder="Enter your student ID"
            required
          />

          <Select
            mt={15}
            label="Course"
            placeholder="Select course"
            clearable
            data={["React", "Angular", "Vue", "Svelte"]}
          />

          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </div>
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

export default AdminAuthModal
