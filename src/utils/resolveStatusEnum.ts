import { TeacherStatusEnum } from "../types/enums/TeacherStatusEnum"

// Resolves and returns the proper Enum value based on fetched 'status' from backend
export const resolveStatusEnum = (status: string) => {
  switch (status) {
    case "available":
      return TeacherStatusEnum.AVAILABLE
    case "away":
      return TeacherStatusEnum.AWAY
    case "unavailable":
      return TeacherStatusEnum.UNAVAILABLE
    case "cutoff":
      return TeacherStatusEnum.CUTOFF
    default:
      return TeacherStatusEnum.UNAVAILABLE
  }
}
