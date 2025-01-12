import { Card } from "@mantine/core"
import { Loader } from "lucide-react"

export default function CardLoader() {
  return (
    <Card shadow="sm" padding="lg" h={200} radius="lg" maw="22rem" w="100%">
      <div className="flex h-full w-full items-center justify-center">
        <Loader color="blue" />
      </div>
    </Card>
  )
}
