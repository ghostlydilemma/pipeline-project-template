import { DateRangeDto } from '../datetime'
import { DepartmentDto } from '../department'

export class EmployeeDto {
  id: string
  firstname: string
  middlename: string
  lastname: string
  address: string
  dateOfBirth: Date
  salary: number
  isActive: boolean
  activeInCompany: DateRangeDto[]
  department: DepartmentDto
}
