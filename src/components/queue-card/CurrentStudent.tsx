import React, { useEffect, useState } from "react"

import { Check, Copy } from "lucide-react"

import { Student } from "../../types/entities/Student"
import toast from "../../utils/toast"

interface CurrentStudentProps {
  currentStudent: Student | null
}

const CurrentStudent: React.FC<CurrentStudentProps> = ({ currentStudent }) => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    if (currentStudent?.id) {
      navigator.clipboard.writeText(currentStudent.id)
      toast.success("Student ID copied to clipboard.")
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }

  useEffect(() => {
    setCopied(false)
  }, [currentStudent?.id])

  const Icon = !copied ? Copy : Check

  return (
    <button
      onClick={handleCopy}
      disabled={!currentStudent?.id || copied}
      className="relative left-1 flex items-center justify-center gap-2 rounded-md"
    >
      <div className="text-gray-600">
        <span className="flex">{currentStudent?.id ? `${currentStudent.name}` : null}</span>
        <span className="flex items-center justify-center gap-1">
          {currentStudent?.id ? `${currentStudent?.id}` : null}{" "}
          {currentStudent?.id && <Icon className={`${copied ? "size-4 text-green-400" : "size-3 text-gray-400"}`} />}
        </span>
      </div>
    </button>
  )
}

export default CurrentStudent
