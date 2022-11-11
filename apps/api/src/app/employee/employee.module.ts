import { Logger, Module } from '@nestjs/common'

import { EmployeeAbsenceController } from './employee-absence.controller'
import { EmployeeAbsenceService } from './employee-absence.service'
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { PaginationService } from '../pagination/pagination.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [],
  controllers: [EmployeeController, EmployeeAbsenceController],
  providers: [EmployeeService, EmployeeAbsenceService, PaginationService, PrismaService, Logger],
})
export class EmployeeModule {}
