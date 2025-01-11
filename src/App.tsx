import { useState } from "react"

import QueueCard from "./components/QueueCard"
import UserQueueInfoCard from "./components/UserQueueInfoCard"
import { ProgramEnum } from "./types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "./types/enums/TeacherStatusEnum"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <QueueCard
          program={ProgramEnum.CS}
          current={42}
          total={130}
          status={TeacherStatusEnum.UNAVAILABLE}
          teacher="Doriz Roa"
        />
        <QueueCard
          program={ProgramEnum.IT}
          current={100}
          total={130}
          status={TeacherStatusEnum.AVAILABLE}
          teacher="Gran Sabandal"
        />
        <QueueCard
          program={ProgramEnum.IS}
          current={20}
          total={130}
          status={TeacherStatusEnum.AWAY}
          teacher="Glenn Pepito"
        />

        {/* Temporarily called, Please move this component to appropriate page */}
        <UserQueueInfoCard userNumber={10} current={20} total={100} />
      </div>
    </>
  )
}

export default App
