import React, { useEffect, useState } from "react"

import { Button } from "@mantine/core"

import CardLoader from "../components/layout/CardLoader"
import QueueCard from "../components/queue-card/QueueCard"
import { useAuth } from "../contexts/AuthContext"
import { useQueueData } from "../hooks/useQueueData"
import { useQueueUpdate } from "../hooks/useQueueUpdate"
import { useStatusUpdate } from "../hooks/useStatusUpdate"
import { StudentService } from "../services/student.service"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import toast from "../utils/toast"

const AdminPage: React.FC = () => {
  const { basicAuthToken } = useAuth() // Get the basic auth token from AuthContext
  const [username, setUsername] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [newStudent, setNewStudent] = useState<{ idNumber: string; name: string }>({
    idNumber: "",
    name: "",
  })

  const queues = [
    { program: ProgramEnum.CS, course: CourseNameEnum.BSCS },
    { program: ProgramEnum.IT, course: CourseNameEnum.BSIT },
    { program: ProgramEnum.IS, course: CourseNameEnum.BSIS },
  ]

  // Call hooks individually at the top level
  const csQueueData = useQueueData(CourseNameEnum.BSCS)
  const itQueueData = useQueueData(CourseNameEnum.BSIT)
  const isQueueData = useQueueData(CourseNameEnum.BSIS)
  const { updateStatus } = useStatusUpdate()
  const { updateQueue } = useQueueUpdate()

  // Combine the data into an array after the hooks are called
  const queueData = [csQueueData, itQueueData, isQueueData]

  const handleQueueUpdate = async (course: CourseNameEnum) => {
    console.log("update queue route:")

    if (basicAuthToken) {
      // Check if the token is not null
      const result = await updateQueue(course, basicAuthToken)
      if (!result.success) {
        console.log("Failed to update queue. Please try again")
      } else {
        console.log(`Queue for ${course} updated successfully!`)
      }
    } else {
      console.log("Authorization token is missing.")
    }
  }

  const handleStatusUpdate = async (course: CourseNameEnum, newStatus: TeacherStatusEnum) => {
    if (basicAuthToken) {
      // Check if the token is not null
      const result = await updateStatus(course, newStatus, basicAuthToken)
      if (!result.success) {
        console.log("Failed to update status. Please try again")
      }
    } else {
      console.log("Authorization token is missing.")
    }
  }

  const handleAddStudent = async () => {
    if (!basicAuthToken) {
      console.log("Authorization token is missing.")
      return
    }

    if (!newStudent.idNumber || !newStudent.name) {
      toast.error("Please fill in all fields.")
      return
    }

    try {
      const response = await StudentService.addStudent(newStudent.idNumber, newStudent.name, basicAuthToken)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success("Student added successfully!")
    } catch (error) {
      console.error("Error adding student:", error)
      toast.error("Failed to add student. Please try again.")
    } finally {
      setNewStudent({ idNumber: "", name: "" }) // Reset the form
      setShowModal(false) // Close the modal after adding the student
    }
  }

  useEffect(() => {
    if (basicAuthToken) {
      setUsername(atob(basicAuthToken).split(":")[0]) // Decode the basic auth token to get the username
    }
  }, [basicAuthToken])

  return (
    <div className="flex w-full flex-1 flex-col items-center py-8 md:py-12">
      <div className="mx-auto my-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4">
        <div className="grid w-full grid-cols-1 justify-items-center gap-4 md:grid-cols-3 md:gap-6">
          {queueData.map((data, index) => {
            const { numberData, coordinatorData } = data

            if (numberData.error || coordinatorData.error) return <div key={index}>Error Loading Data</div>
            if (!numberData.data || !coordinatorData.data) return <CardLoader key={index} />

            const status = coordinatorData.data.status.toUpperCase() as keyof typeof TeacherStatusEnum
            const teacherStatus = TeacherStatusEnum[status]

            return (
              <QueueCard
                key={index}
                program={queues[index].program}
                current={numberData.data.current}
                currentStudent={
                  (numberData.data.queuedStudents.length && numberData.data.queuedStudents[0].student) || null
                }
                total={numberData.data.max}
                status={teacherStatus}
                teacher={coordinatorData.data.name}
                onUpdateQueue={() => handleQueueUpdate(queues[index].course)} // Call handleQueueUpdate
                onStatusChange={(newStatus) => handleStatusUpdate(queues[index].course, newStatus)}
                isAdmin={true}
              />
            )
          })}
        </div>
      </div>
      {username === "cisco" && (
        <>
          <div className="mt-8 flex flex-col items-center justify-center gap-2">
            <p className="text-sm">Student not in the database?</p>
            <Button onClick={() => setShowModal(true)} w={"100%"} radius="md">
              Add student
            </Button>
          </div>

          {/* Add User Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <form className="rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Add Student</h2>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium">ID Number</label>
                  <input
                    type="text"
                    value={newStudent.idNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, idNumber: e.target.value })}
                    className="w-full rounded border p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full rounded border p-2"
                    required
                  />
                </div>
                <Button onClick={handleAddStudent} w={"100%"} radius="md">
                  Add Student
                </Button>
                <Button
                  onClick={() => {
                    setShowModal(false)
                    setNewStudent({ idNumber: "", name: "" })
                  }}
                  w={"100%"}
                  radius="md"
                  className="mt-2 bg-neutral-300 hover:bg-neutral-400"
                >
                  Cancel
                </Button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminPage
