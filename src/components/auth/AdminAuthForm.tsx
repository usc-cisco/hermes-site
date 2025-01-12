import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

import { useAuth } from "../../contexts/AuthContext"
import { AuthService } from "../../services/auth.service"

interface AdminAuthFormProps {
  close: () => void
}

export function AdminAuthForm({ close }: AdminAuthFormProps) {
  const { setBasicAuth } = useAuth()

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (val) => (typeof val === "string" ? null : "Username must be a string"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  })

  const handleSubmit = async () => {
    try {
      const response = await AuthService.adminLogin(form.values)

      setBasicAuth(response.token)
    } catch (error) {
      console.log(error)
    } finally {
      close()
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={form.onSubmit(() => {
          handleSubmit()
        })}
      >
        <TextInput
          style={{
            input: {
              "&::placeholder": {
                color: "black",
              },
            },
          }}
          label="Username"
          error={form.errors.username && "Invalid Username"}
          value={form.values.username}
          onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
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
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={form.errors.password && "Invalid Password"}
          value={form.values.password}
          onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
          required
          mt={5}
        />
        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>
        <Button fullWidth mt="sm" color="darkGray" variant="outline" onClick={close}>
          Close
        </Button>
      </form>
    </div>
  )
}

export default AdminAuthForm
