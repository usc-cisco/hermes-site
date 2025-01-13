import React, { useEffect, useState } from "react"

import { Check, Copy } from "lucide-react"

import toast from "../../utils/toast"

interface CurrentStudentProps {
  currentStudentId: string | null
}

const CurrentStudent: React.FC<CurrentStudentProps> = ({ currentStudentId }) => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    if (currentStudentId) {
      navigator.clipboard.writeText(currentStudentId)
      toast.success("Student ID copied to clipboard.")
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }

  useEffect(() => {
    setCopied(false)
  }, [currentStudentId])

  const Icon = !copied ? Copy : Check

  return (
    <button
      onClick={handleCopy}
      disabled={!currentStudentId || copied}
      className="flex items-center justify-center gap-2 rounded-md"
    >
      <p className="text-gray-600">{currentStudentId ?? "None in queue "}</p>
      {currentStudentId !== null && <Icon className={`${copied ? "size-4 text-green-400" : "size-3 text-gray-400"}`} />}
    </button>
  )
}

export default CurrentStudent
