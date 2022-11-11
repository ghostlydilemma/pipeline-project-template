import { Controller, Get, Logger, Param, ParseIntPipe, Query } from '@nestjs/common'

import { DateRange } from '@prisma/client'
import { EmployeeAbsenceService } from './employee-absence.service'
import { PaginatedListDto } from '@pipeline-project-template/api-interfaces'
import { PaginationService } from '../pagination/pagination.service'

@Controller('employee')
export class EmployeeAbsenceController {
  constructor(
    private readonly employeeAbsenceService: EmployeeAbsenceService,
    private readonly paginationService: PaginationService,
    private readonly logger: Logger
  ) {}

  @Get(':id/absence')
  getAbsencesByEmployeeId(
    @Param('id') id: string,
    @Query('limit', ParseIntPipe) limit = 50,
    @Query('offset', ParseIntPipe) offset = 0
  ): Promise<PaginatedListDto<DateRange>> {
    this.logger.log('Absences are fetched for employee with pagination', { id, limit, offset })
    return this.employeeAbsenceService.getAbsencesByEmployeeId(id, { limit, offset }).then(async (absences) =>
      this.paginationService.createPagination(absences, {
        offset,
        limit,
        totalItems: await this.employeeAbsenceService.absenceTableSize(id),
      })
    )
  }
}
