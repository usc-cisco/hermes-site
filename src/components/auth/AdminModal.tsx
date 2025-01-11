import { Anchor, Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import AdminAuthForm from "./AdminAuthForm"

export default function AdminModal() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Admin Sign in"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <AdminAuthForm>
          <Button fullWidth mt="xl" type="submit" onClick={close}>
            Sign in
          </Button>
        </AdminAuthForm>
      </Modal>

      <Anchor size="sm" component="button" ta="center" onClick={open}>
        Admin Sign in
      </Anchor>
    </>
  )
}
