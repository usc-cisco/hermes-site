import { Button, Paper, Select, Text, TextInput } from "@mantine/core"
import { modals } from "@mantine/modals"

interface RevokeModalProps {
  onConfirm: () => void
}

const AdminAuthModal = {
  open: ({ onConfirm }: RevokeModalProps) => {
    return modals.openConfirmModal({
      title: "Admin Sign In",
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
            label="Username"
            placeholder="Enter your username"
            required
          />

          <TextInput
            style={{
              input: {
                "&::placeholder": {
                  color: "black",
                },
              },
            }}
            label="Password"
            placeholder="Enter your password"
            required
            mt={5}
          />
        </div>
      ),
      labels: {
        confirm: "Sign in",
        cancel: "Cancel",
      },
      confirmProps: {
        color: "green",
        radius: "md",

        styles: {
          root: {
            backgroundColor: "#1752F0",
            "&:hover": {
              backgroundColor: "#1752F0",
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
