import { Anchor, Button, Container, Paper, Select, Text, TextInput, Title } from "@mantine/core"
import { ChevronDown } from "lucide-react"

import { CourseNameEnum } from "../../types/enums/CourseNameEnum"
import AdminAuthModal from "./AdminAuthModal"

interface AuthFormProps {
  onRevoke?: () => void
}

export function AuthForm({ onRevoke }: AuthFormProps) {
  const handleOpenAdminAuthModal = () => {
    AdminAuthModal.open({
      onConfirm: () => {
        if (onRevoke) {
          onRevoke()
        }
      },
    })
  }

  return (
    <div className="w-full">
      <Container size={400} my={10}>
        <h1 className="text-center text-4xl font-bold">Welcome!</h1>
        <Paper withBorder shadow="lg" p={30} mt={20} radius="md">
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
            data={[CourseNameEnum.BSCS, CourseNameEnum.BSIT, CourseNameEnum.BSIS]}
            rightSection={<ChevronDown size={14} color="black" />}
          />

          <Button fullWidth mt="xl">
            Sign in
          </Button>
          <div className="mt-3 flex w-full items-center justify-center">
            <Anchor size="sm" component="button" ta="center" onClick={handleOpenAdminAuthModal}>
              Admin Sign in
            </Anchor>
          </div>
        </Paper>
      </Container>
    </div>
  )
}

export default AuthForm
