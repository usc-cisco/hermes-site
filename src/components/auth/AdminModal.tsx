import { Anchor, Modal } from "@mantine/core"
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
        <AdminAuthForm close={close} />
      </Modal>

      <Anchor size="sm" component="button" ta="center" onClick={open} c="primary">
        Admin Sign in
      </Anchor>
    </>
  )
}
