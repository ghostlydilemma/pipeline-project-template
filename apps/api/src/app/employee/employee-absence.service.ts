import { Injectable, Logger } from '@nestjs/common'

import { DateRange } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EmployeeAbsenceService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  getAbsencesByEmployeeId(employeeId: string, pagination: { offset?: number; limit?: number }): Promise<DateRange[]> {
    const { offset, limit } = pagination
    this.logger.log('All absences are fetched for employee', { id: employeeId, offset, limit })
    return this.prisma.dateRange.findMany({
      skip: Number(offset) || undefined,
      take: Number(limit) || undefined,
      where: {
        employeeId,
        OR: [
          {
            type: 'holiday',
          },
          {
            type: 'illness',
          },
        ],
      },
      orderBy: [
        {
          startDate: 'desc',
        },
      ],
    })
  }

  async absenceTableSize(employeeId: string): Promise<number> {
    return this.prisma.dateRange.count({
      where: {
        employeeId,
        OR: [
          {
            type: 'holiday',
          },
          {
            type: 'illness',
          },
        ],
      },
    })
  }
}
