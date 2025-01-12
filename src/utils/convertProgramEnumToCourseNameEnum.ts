import { CourseNameEnum } from "../types/enums/CourseNameEnum"
import { ProgramEnum } from "../types/enums/ProgramsEnum"

export const convertProgramEnumToCourseNameEnum = (program: ProgramEnum) => {
  switch (program) {
    case ProgramEnum.CS:
      return CourseNameEnum.BSCS
    case ProgramEnum.IT:
      return CourseNameEnum.BSIT
    case ProgramEnum.IS:
      return CourseNameEnum.BSIS
  }
}
