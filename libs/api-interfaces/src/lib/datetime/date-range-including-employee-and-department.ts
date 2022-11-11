import { DateRange, Department, Employee } from '@prisma/client'

export type DateRangeIncludingEmployeeAndDepartment = DateRange & { employee: Employee & { department: Department } }
