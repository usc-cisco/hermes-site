// Resolves and returns the proper program name based on fetched 'courseName' from backend
export const resolveProgramName = (program: string) => {
  switch (program) {
    case "BSCS":
      return "Computer Science"
    case "BSIT":
      return "Information Technology"
    case "BSIS":
      return "Information Science"
    default:
      return "Invalid Value"
  }
}
