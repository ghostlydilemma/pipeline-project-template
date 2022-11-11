import { DateRange, PrismaClient } from '@prisma/client'
import { DeepMockProxy, MockProxy, mock, mockDeep } from 'jest-mock-extended'
import { Test, TestingModule } from '@nestjs/testing'

import { EmployeeAbsenceService } from './employee-absence.service'
import { Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

describe('EmployeeAbsenceService', () => {
  let service: EmployeeAbsenceService
  let logger: MockProxy<Logger>
  let prisma: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeAbsenceService, PrismaService, { provide: Logger, useFactory: () => mock() }],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile()

    service = module.get<EmployeeAbsenceService>(EmployeeAbsenceService)
    logger = module.get(Logger)
    prisma = module.get(PrismaService)

    const fakeDate = new Date(2022, 9, 10, 4, 30, 5, 10)
    jest.useFakeTimers().setSystemTime(fakeDate)
  })

  describe('Get absences by Employee Id', () => {
    it('should fetch absences by Employee Id without pagination', () => {
      const expectedAbsences: DateRange[] = [
        {
          startDate: new Date(2022, 10, 7),
          endDate: new Date(2022, 10, 14),
          type: 'holiday',
        } as DateRange,
      ]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prisma.dateRange.findMany.mockResolvedValue(expectedAbsences)

      const absences = service.getAbsencesByEmployeeId('1', {})

      expect(prisma.dateRange.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        where: {
          employeeId: '1',
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
      expect(logger.log).toHaveBeenCalledWith('All absences are fetched for employee', {
        id: '1',
        offset: undefined,
        limit: undefined,
      })
      return expect(absences).resolves.toBe(expectedAbsences)
    })

    it('should fetch absences by Employee Id with pagination', () => {
      const expectedAbsences: DateRange[] = [
        {
          startDate: new Date(2022, 10, 7),
          endDate: new Date(2022, 10, 14),
          type: 'holiday',
        } as DateRange,
      ]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prisma.dateRange.findMany.mockResolvedValue(expectedAbsences)

      const absences = service.getAbsencesByEmployeeId('1', { offset: 15, limit: 15 })

      expect(prisma.dateRange.findMany).toHaveBeenCalledWith({
        skip: 15,
        take: 15,
        where: {
          employeeId: '1',
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
      expect(logger.log).toHaveBeenCalledWith('All absences are fetched for employee', {
        id: '1',
        offset: 15,
        limit: 15,
      })
      return expect(absences).resolves.toBe(expectedAbsences)
    })
  })

  it('should return the table size for all absences for given employee', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.dateRange.count.mockResolvedValue(30)

    const tableSize = service.absenceTableSize('1')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(prisma.dateRange.count).toHaveBeenCalledWith({
      where: {
        employeeId: '1',
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
    return expect(tableSize).resolves.toBe(30)
  })
})
