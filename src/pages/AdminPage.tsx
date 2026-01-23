import React, { useEffect, useState } from "react"

import { Button, Card, Flex, Loader, Modal, Text, TextInput, Textarea } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Megaphone, Trash2, UserPlus } from "lucide-react"
import { mutate } from "swr"

import DeleteAnnouncementConfirmModal from "../components/announcement/DeleteAnnouncementConfirmModal"
import CardLoader from "../components/layout/CardLoader"
import QueueCard from "../components/queue-card/QueueCard"
import { useAuth } from "../contexts/AuthContext"
import { useQueueData } from "../hooks/useQueueData"
import { useQueueUpdate } from "../hooks/useQueueUpdate"
import { useStatusUpdate } from "../hooks/useStatusUpdate"
import { AnnouncementService } from "../services/announcement.service"
import { QueueService } from "../services/queue.service"
import { StudentService } from "../services/student.service"
import { Announcement } from "../types/entities/Announcement"
import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"
import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"
import toast from "../utils/toast"

const AdminPage: React.FC = () => {
  const { basicAuthToken, isCisco } = useAuth()
  const [addStudentModalOpened, { open: openAddStudentModal, close: closeAddStudentModal }] = useDisclosure(false)
  const [addToQueueModalOpened, { open: openAddToQueueModal, close: closeAddToQueueModal }] = useDisclosure(false)
  const [dequeueModalOpened, { open: openDequeueModal, close: closeDequeueModal }] = useDisclosure(false)
  const [addAnnouncementModalOpened, { open: openAddAnnouncementModal, close: closeAddAnnouncementModal }] =
    useDisclosure(false)
  const [announcementText, setAnnouncementText] = useState<string>("")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [announcementsLoading, setAnnouncementsLoading] = useState<boolean>(true)
  const [dequeueStudentId, setDequeueStudentId] = useState<string>("")
  const [dequeueStudentSearchResult, setDequeueStudentSearchResult] = useState<{
    student: { id: string; name: string } | null
    loading: boolean
    error: string | null
  }>({
    student: null,
    loading: false,
    error: null,
  })
  const [newStudent, setNewStudent] = useState<{ idNumber: string; name: string }>({
    idNumber: "",
    name: "",
  })
  const [queueStudent, setQueueStudent] = useState<{ idNumber: string; course: CourseNameEnum | null }>({
    idNumber: "",
    course: null,
  })
  const [studentSearchResult, setStudentSearchResult] = useState<{
    student: { id: string; name: string } | null
    loading: boolean
    error: string | null
  }>({
    student: null,
    loading: false,
    error: null,
  })

  const openAddToQueueModalForCourse = (course: CourseNameEnum) => {
    setQueueStudent({ idNumber: "", course })
    setStudentSearchResult({ student: null, loading: false, error: null })
    openAddToQueueModal()
  }

  // Debounced student search
  useEffect(() => {
    if (!addToQueueModalOpened || !queueStudent.idNumber || !basicAuthToken) {
      setStudentSearchResult({ student: null, loading: false, error: null })
      return
    }

    const idNumber = queueStudent.idNumber.trim()
    if (idNumber.length === 0) {
      setStudentSearchResult({ student: null, loading: false, error: null })
      return
    }

    // Debounce: wait 500ms after user stops typing
    const timeoutId = setTimeout(async () => {
      setStudentSearchResult({ student: null, loading: true, error: null })

      try {
        const result = await StudentService.getStudentById(idNumber, basicAuthToken)

        console.log(result, result.student?.name)
        if (result.error) {
          setStudentSearchResult({ student: null, loading: false, error: result.error })
        } else if (result.student) {
          setStudentSearchResult({ student: result.student, loading: false, error: null })
        } else {
          setStudentSearchResult({ student: null, loading: false, error: "Student not found" })
        }
      } catch (error) {
        console.error("Error searching for student:", error)
        setStudentSearchResult({ student: null, loading: false, error: "Failed to search for student" })
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [queueStudent.idNumber, addToQueueModalOpened, basicAuthToken])

  // Debounced student search for dequeue modal
  useEffect(() => {
    if (!dequeueModalOpened || !dequeueStudentId || !basicAuthToken) {
      setDequeueStudentSearchResult({ student: null, loading: false, error: null })
      return
    }

    const idNumber = dequeueStudentId.trim()
    if (idNumber.length === 0) {
      setDequeueStudentSearchResult({ student: null, loading: false, error: null })
      return
    }

    // Debounce: wait 500ms after user stops typing
    const timeoutId = setTimeout(async () => {
      setDequeueStudentSearchResult({ student: null, loading: true, error: null })

      try {
        const result = await StudentService.getStudentById(idNumber, basicAuthToken)

        if (result.error) {
          setDequeueStudentSearchResult({ student: null, loading: false, error: result.error })
        } else if (result.student) {
          setDequeueStudentSearchResult({ student: result.student, loading: false, error: null })
        } else {
          setDequeueStudentSearchResult({ student: null, loading: false, error: "Student not found" })
        }
      } catch (error) {
        console.error("Error searching for student:", error)
        setDequeueStudentSearchResult({ student: null, loading: false, error: "Failed to search for student" })
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [dequeueStudentId, dequeueModalOpened, basicAuthToken])

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setAnnouncementsLoading(true)
        const data = await AnnouncementService.getAnnouncements()
        setAnnouncements(data)
      } catch (error) {
        console.error("Error fetching announcements:", error)
        setAnnouncements([])
      } finally {
        setAnnouncementsLoading(false)
      }
    }

    if (isCisco) {
      fetchAnnouncements()
    }
  }, [isCisco])

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

  const handleQueueUpdate = async (course: CourseNameEnum, studentId: string) => {
    if (basicAuthToken) {
      const result = await updateQueue(course, studentId, basicAuthToken)
      if (!result.success) {
        toast.error("Failed to update queue. Please try again")
      } else {
        toast.success(`Queue for ${course} updated successfully!`)
      }
    } else {
      toast.error("Authorization token is missing.")
    }
  }

  const getStatusLabel = (status: TeacherStatusEnum): string => {
    switch (status) {
      case TeacherStatusEnum.AVAILABLE:
        return "Available"
      case TeacherStatusEnum.AWAY:
        return "Away"
      case TeacherStatusEnum.UNAVAILABLE:
        return "Unavailable"
      case TeacherStatusEnum.CUTOFF:
        return "Cutoff"
      default:
        return "Unknown"
    }
  }

  const handleStatusUpdate = async (course: CourseNameEnum, newStatus: TeacherStatusEnum) => {
    if (basicAuthToken) {
      const result = await updateStatus(course, newStatus, basicAuthToken)
      if (!result.success) {
        toast.error("Failed to update status. Please try again")
      } else {
        toast.success(`Status updated to ${getStatusLabel(newStatus)}`)
      }
    } else {
      toast.error("Authorization token is missing.")
    }
  }

  const handleAddStudent = async () => {
    if (!basicAuthToken) {
      toast.error("Authorization token is missing.")
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
      setNewStudent({ idNumber: "", name: "" })
      closeAddStudentModal()
    } catch (error) {
      console.error("Error adding student:", error)
      toast.error("Failed to add student. Please try again.")
    }
  }

  const handleAddStudentToQueue = async () => {
    if (!basicAuthToken) {
      toast.error("Authorization token is missing.")
      return
    }

    if (!queueStudent.idNumber || !queueStudent.course) {
      toast.error("Please fill in all fields.")
      return
    }

    if (!studentSearchResult.student) {
      toast.error("Student not found in database. Please add student first.")
      return
    }

    try {
      const result = await QueueService.addStudentToQueue(queueStudent.course, queueStudent.idNumber, basicAuthToken)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(`Student added to ${queueStudent.course} queue successfully!`)
      setQueueStudent({ idNumber: "", course: null })
      setStudentSearchResult({ student: null, loading: false, error: null })
      closeAddToQueueModal()
      await mutate(`queue/${queueStudent.course}/number/current`)
    } catch (error) {
      console.error("Error adding student to queue:", error)
      toast.error("Failed to add student to queue. Please try again.")
    }
  }

  const handleDequeueStudent = async () => {
    if (!basicAuthToken) {
      toast.error("Authorization token is missing.")
      return
    }

    if (!dequeueStudentId.trim()) {
      toast.error("Please enter a student ID number.")
      return
    }

    if (!dequeueStudentSearchResult.student) {
      toast.error("Student not found in database. Please verify the ID number.")
      return
    }

    try {
      const result = await QueueService.dequeueStudentById(dequeueStudentId.trim(), basicAuthToken)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success("Student removed from queue successfully!")
      setDequeueStudentId("")
      setDequeueStudentSearchResult({ student: null, loading: false, error: null })
      closeDequeueModal()
    } catch (error) {
      console.error("Error dequeuing student:", error)
      toast.error("Failed to remove student from queue. Please try again.")
    }
  }

  const handleAddAnnouncement = async () => {
    if (!basicAuthToken) {
      toast.error("Authorization token is missing.")
      return
    }

    if (!announcementText.trim()) {
      toast.error("Please enter an announcement.")
      return
    }

    try {
      const result = await AnnouncementService.addAnnouncement(announcementText.trim(), basicAuthToken)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success("Announcement added successfully!")
      setAnnouncementText("")
      closeAddAnnouncementModal()
      // Refresh announcements
      const data = await AnnouncementService.getAnnouncements()
      setAnnouncements(data)
    } catch (error) {
      console.error("Error adding announcement:", error)
      toast.error("Failed to add announcement. Please try again.")
    }
  }

  const handleDeleteAnnouncement = async (id: number) => {
    if (!basicAuthToken) {
      toast.error("Authorization token is missing.")
      return
    }

    try {
      const result = await AnnouncementService.deleteAnnouncement(id, basicAuthToken)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success("Announcement deleted successfully!")
      // Refresh announcements
      const data = await AnnouncementService.getAnnouncements()
      setAnnouncements(data)
    } catch (error) {
      console.error("Error deleting announcement:", error)
      toast.error("Failed to delete announcement. Please try again.")
    }
  }

  const openDeleteAnnouncementModal = (id: number) => {
    DeleteAnnouncementConfirmModal.open({
      onConfirm: () => handleDeleteAnnouncement(id),
    })
  }

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col items-center bg-white py-8 md:py-12">
      {/* Repeating logo background pattern */}
      <div
        className="pointer-events-none fixed inset-0 z-0 animate-[drift_8s_linear_infinite] opacity-[0.03]"
        style={{
          backgroundImage: "url('/logo-primary.svg')",
          backgroundSize: "150px 150px",
          backgroundRepeat: "repeat",
          willChange: "background-position",
        }}
      />
      <style>
        {`
          @keyframes drift {
            from {
              background-position: 0 0;
            }
            to {
              background-position: 150px -150px;
            }
          }
        `}
      </style>
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4">
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
                onUpdateQueue={() =>
                  handleQueueUpdate(
                    queues[index].course,
                    (numberData.data?.queuedStudents.length && numberData.data?.queuedStudents[0].student?.id) || "",
                  )
                }
                onStatusChange={(newStatus) => handleStatusUpdate(queues[index].course, newStatus)}
                isAdmin={true}
                onAddStudentToQueue={isCisco ? () => openAddToQueueModalForCourse(queues[index].course) : undefined}
                onDequeueStudent={isCisco ? openDequeueModal : undefined}
              />
            )
          })}
        </div>
      </div>
      {isCisco && (
        <div className="relative z-10 mt-8 flex w-full max-w-7xl flex-col items-center gap-4 px-4">
          <Flex gap="md" wrap="wrap" justify="center">
            <Button leftSection={<UserPlus size={16} />} onClick={openAddStudentModal} radius="md" bg="primary">
              Add Student to Database
            </Button>
            <Button leftSection={<Megaphone size={16} />} onClick={openAddAnnouncementModal} radius="md" bg="primary">
              Add Announcement
            </Button>
          </Flex>

          {/* Announcements Management */}
          <Card shadow="sm" padding="md" radius="lg" w="100%" maw="1200px" mt="md">
            <Text size="lg" fw={600} mb="md">
              Manage Announcements
            </Text>
            {announcementsLoading ? (
              <Flex align="center" justify="center" py="md">
                <Loader size="sm" />
              </Flex>
            ) : announcements.length === 0 ? (
              <Text size="sm" c="dimmed">
                No announcements at this time.
              </Text>
            ) : (
              <Flex direction="column" gap="md">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} padding="sm" radius="md" style={{ backgroundColor: "#f9f9f9" }}>
                    <Flex justify="space-between" align="flex-start" gap="md">
                      <Flex direction="column" gap="xs" style={{ flex: 1 }}>
                        <Text size="xs" c="dimmed">
                          {announcement.date instanceof Date
                            ? announcement.date.toDateString()
                            : new Date(announcement.date).toDateString()}
                        </Text>
                        <Text size="sm">
                          {Array.isArray(announcement.text) ? announcement.text.join(" ") : announcement.text}
                        </Text>
                      </Flex>
                      <Button
                        size="xs"
                        variant="subtle"
                        color="red"
                        leftSection={<Trash2 size={14} />}
                        onClick={() => openDeleteAnnouncementModal(announcement.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            )}
          </Card>
        </div>
      )}

      {/* Add Student to Database Modal */}
      <Modal opened={addStudentModalOpened} onClose={closeAddStudentModal} title="Add Student to Database" centered>
        <Flex direction="column" gap="md">
          <TextInput
            label="ID Number"
            placeholder="Enter student ID number"
            value={newStudent.idNumber}
            onChange={(e) => setNewStudent({ ...newStudent, idNumber: e.target.value })}
            required
          />
          <TextInput
            label="Full Name"
            placeholder="Enter student full name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            required
          />
          <Flex gap="sm" mt="md">
            <Button onClick={handleAddStudent} fullWidth radius="md" bg="primary">
              Add Student
            </Button>
            <Button
              onClick={() => {
                closeAddStudentModal()
                setNewStudent({ idNumber: "", name: "" })
              }}
              fullWidth
              radius="md"
              variant="outline"
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Modal>

      {/* Add Student to Queue Modal */}
      <Modal
        opened={addToQueueModalOpened}
        onClose={() => {
          closeAddToQueueModal()
          setQueueStudent({ idNumber: "", course: null })
          setStudentSearchResult({ student: null, loading: false, error: null })
        }}
        title={`Add Student to ${queueStudent.course} Queue`}
        centered
      >
        <Flex direction="column" gap="md">
          <TextInput
            label="Student ID Number"
            placeholder="Enter student ID number"
            value={queueStudent.idNumber}
            onChange={(e) => setQueueStudent({ ...queueStudent, idNumber: e.target.value })}
            required
          />

          {/* Student Search Result Display */}
          {queueStudent.idNumber.trim().length > 0 && (
            <div className="-mt-2">
              {studentSearchResult.student ? (
                <Text size="xs" c="dimmed" fw={500} className="uppercase">
                  STUDENT: {studentSearchResult.student.name}
                </Text>
              ) : studentSearchResult.error ? (
                <Text size="xs" c="red" fw={500} className="uppercase">
                  STUDENT NOT FOUND
                </Text>
              ) : (
                <Flex align="center" gap="xs">
                  <Loader size="xs" />
                  <Text size="xs" c="dimmed" fw={500}>
                    Searching...
                  </Text>
                </Flex>
              )}
            </div>
          )}

          <Flex gap="sm" mt="md">
            <Button
              onClick={handleAddStudentToQueue}
              fullWidth
              radius="md"
              bg="primary"
              disabled={!studentSearchResult.student || studentSearchResult.loading}
            >
              Enqueue
            </Button>
            <Button
              onClick={() => {
                closeAddToQueueModal()
                setQueueStudent({ idNumber: "", course: null })
                setStudentSearchResult({ student: null, loading: false, error: null })
              }}
              fullWidth
              radius="md"
              variant="outline"
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Modal>

      {/* Add Announcement Modal */}
      <Modal
        opened={addAnnouncementModalOpened}
        onClose={() => {
          closeAddAnnouncementModal()
          setAnnouncementText("")
        }}
        title="Add Announcement"
        centered
      >
        <Flex direction="column" gap="md">
          <Textarea
            label="Announcement"
            placeholder="Enter announcement text. Each announcement is its own bullet point."
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            required
            minRows={4}
            autosize
          />
          <Flex gap="sm" mt="md">
            <Button onClick={handleAddAnnouncement} fullWidth radius="md" bg="primary">
              Add Announcement
            </Button>
            <Button
              onClick={() => {
                closeAddAnnouncementModal()
                setAnnouncementText("")
              }}
              fullWidth
              radius="md"
              variant="outline"
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Modal>

      {/* Dequeue Student Modal */}
      <Modal
        opened={dequeueModalOpened}
        onClose={() => {
          closeDequeueModal()
          setDequeueStudentId("")
          setDequeueStudentSearchResult({ student: null, loading: false, error: null })
        }}
        title="Remove Student from Queue"
        centered
      >
        <Flex direction="column" gap="md">
          <TextInput
            label="Student ID Number"
            placeholder="Enter student ID number"
            value={dequeueStudentId}
            onChange={(e) => setDequeueStudentId(e.target.value)}
            required
          />

          {/* Student Search Result Display */}
          {dequeueStudentId.trim().length > 0 && (
            <div className="-mt-2">
              {dequeueStudentSearchResult.student ? (
                <Text size="xs" c="dimmed" fw={500} className="uppercase">
                  STUDENT: {dequeueStudentSearchResult.student.name}
                </Text>
              ) : dequeueStudentSearchResult.error ? (
                <Text size="xs" c="red" fw={500} className="uppercase">
                  STUDENT NOT FOUND
                </Text>
              ) : (
                <Flex align="center" gap="xs">
                  <Loader size="xs" />
                  <Text size="xs" c="dimmed" fw={500}>
                    Searching...
                  </Text>
                </Flex>
              )}
            </div>
          )}

          <Flex gap="sm" mt="md">
            <Button
              onClick={handleDequeueStudent}
              fullWidth
              radius="md"
              bg="red"
              disabled={!dequeueStudentSearchResult.student || dequeueStudentSearchResult.loading}
            >
              Remove
            </Button>
            <Button
              onClick={() => {
                closeDequeueModal()
                setDequeueStudentId("")
                setDequeueStudentSearchResult({ student: null, loading: false, error: null })
              }}
              fullWidth
              radius="md"
              variant="outline"
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}

export default AdminPage
