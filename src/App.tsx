import { useState } from "react"

import QueueCard from "./components/QueueCard"
import { Program } from "./types/Programs"
import { TeacherStatus } from "./types/TeacherStatus"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl text-red-500 underline">Hello world!</h1>
      {/* For display purposes. Just remove this. */}
      <div className="flex flex-col items-center gap-4">
        <QueueCard
          program={Program.CS}
          current={42}
          total={130}
          status={TeacherStatus.UNAVAILABLE}
          teacher="Archival Sebial"
        />
        <QueueCard
          program={Program.IT}
          current={100}
          total={130}
          status={TeacherStatus.AVAILABLE}
          teacher="Gran Sabandal"
        />
        <QueueCard program={Program.IS} current={20} total={130} status={TeacherStatus.AWAY} teacher="Glenn Pepito" />
      </div>
    </>
  )
}

export default App
