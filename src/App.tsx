import { useState } from "react"

import QueueCard from "./components/QueueCard"
import { TeacherStatus } from "./types/TeacherStatus"

function App() {
  const [count, setCount] = useState(2)

  return (
    <>
      <h1 className="text-3xl text-red-500 underline">Hello world!</h1>
      <div className="flex flex-col items-center gap-4">
        <QueueCard course="CS" current={42} total={130} status={TeacherStatus.UNAVAILABLE} teacher="Archival Sebial" />
        <QueueCard course="IT" current={100} total={130} status={TeacherStatus.AVAILABLE} teacher="Gran Sabandal" />
        <QueueCard course="IS" current={20} total={130} status={TeacherStatus.AWAY} teacher="Glenn Pepito" />
      </div>
    </>
  )
}

export default App
