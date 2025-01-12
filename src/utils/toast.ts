import { notifications } from "@mantine/notifications"

type ToastOptions = {
  description?: string
}

const toast = {
  success: (message: string = "Success", options?: ToastOptions) => {
    notifications.show({
      title: message,
      message: options?.description || "",
      color: "green",
    })
  },

  info: (message: string = "Info", options?: ToastOptions) => {
    notifications.show({
      title: message,
      message: options?.description || "",
      color: "blue",
    })
  },

  error: (message: string = "Error", options?: ToastOptions) => {
    notifications.show({
      title: message,
      message: options?.description || "",
      color: "red",
    })
  },
}

export default toast
