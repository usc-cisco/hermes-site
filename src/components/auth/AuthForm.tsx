import { Button, Container, Paper, Select, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { ChevronDown } from "lucide-react"

import { useAuth } from "../../contexts/AuthContext"
import { AuthService } from "../../services/auth.service"
import { CourseNameEnum } from "../../types/enums/CourseNameEnum"
import AdminModal from "./AdminModal"

export function AuthForm() {
  const { setJwtAuth } = useAuth()

  const form = useForm({
    initialValues: {
      idNumber: "",
      course: CourseNameEnum.BSCS,
    },

    validate: {
      idNumber: (val) => (/^\d+$/.test(val) ? null : "ID must contain only numbers"),
      course: (val) => (Object.values(CourseNameEnum).includes(val) ? null : "Invalid course"),
    },
  })

  const handleSubmit = async () => {
    try {
      const response = await AuthService.studentLogin(form.values)

      setJwtAuth(response.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <Container size={400} my={10}>
        <h1 className="mt-8 text-center text-4xl font-bold">Welcome!</h1>
        <Paper withBorder shadow="lg" p={30} mt={20} radius="md">
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
              label="Student ID"
              placeholder="Enter your student ID"
              error={form.errors.idNumber && "Invalid ID"}
              value={form.values.idNumber}
              onChange={(event) => form.setFieldValue("idNumber", event.currentTarget.value)}
              required
            />

            <Select
              mt={15}
              label="Course"
              placeholder="Select course"
              value={form.values.course}
              onChange={(value) => form.setFieldValue("course", value as CourseNameEnum)}
              error={form.errors.course && "Invalid Course"}
              data={[CourseNameEnum.BSCS, CourseNameEnum.BSIT, CourseNameEnum.BSIS]}
              rightSection={<ChevronDown size={14} color="black" />}
            />

            <Button fullWidth mt="xl" type="submit" bg="primary">
              Sign in
            </Button>
          </form>
          <div className="mt-3 flex w-full items-center justify-center">
            <AdminModal />
          </div>
        </Paper>
      </Container>
    </div>
  )
}

export default AuthForm
