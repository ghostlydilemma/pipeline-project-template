import { MockProxy, mock } from 'jest-mock-extended'
import { Test, TestingModule } from '@nestjs/testing'

import { DateRange } from '@prisma/client'
import { EmployeeAbsenceController } from './employee-absence.controller'
import { EmployeeAbsenceService } from './employee-absence.service'
import { Logger } from '@nestjs/common'
import { PaginatedListDto } from '@pipeline-project-template/api-interfaces'
import { PaginationService } from '../pagination/pagination.service'

describe('EmployeeAbsenceController', () => {
  let controller: EmployeeAbsenceController
  let logger: MockProxy<Logger>
  let service: MockProxy<EmployeeAbsenceService>
  let paginationService: MockProxy<PaginationService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeAbsenceController],
      providers: [
        {
          provide: EmployeeAbsenceService,
          useFactory: () => mock(),
        },
        {
          provide: PaginationService,
          useFactory: () => mock(),
        },
        { provide: Logger, useFactory: () => mock() },
      ],
    }).compile()

    const fakeDate = new Date(2022, 10, 10, 4, 30, 5, 10)
    jest.useFakeTimers().setSystemTime(fakeDate)

    controller = module.get<EmployeeAbsenceController>(EmployeeAbsenceController)
    logger = module.get(Logger)
    service = module.get(EmployeeAbsenceService)
    paginationService = module.get(PaginationService)
  })

  describe('Get absence by EmployeeId', () => {
    it('should fetch all absences with pagination option', () => {
      const absences: DateRange[] = [
        {
          startDate: new Date(2022, 10, 7),
          endDate: new Date(2022, 10, 14),
          type: 'holiday',
        } as DateRange,
      ]
      const expectedPaginatedAbsences: PaginatedListDto<DateRange> = {
        data: absences,
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalPages: 1,
          totalItems: 1,
        },
      }

      service.getAbsencesByEmployeeId.mockResolvedValue(absences)
      service.absenceTableSize.mockResolvedValue(1)
      paginationService.createPagination.mockReturnValue(expectedPaginatedAbsences)

      const paginatedAbsences = controller.getAbsencesByEmployeeId('1', 15, 15)

      expect(logger.log).toHaveBeenCalledWith('Absences are fetched for employee with pagination', {
        id: '1',
        limit: 15,
        offset: 15,
      })
      expect(service.getAbsencesByEmployeeId).toHaveBeenCalledWith('1', { limit: 15, offset: 15 })
      return expect(paginatedAbsences).resolves.toBe(expectedPaginatedAbsences)
    })

    it('should fetch all absences', () => {
      const absences: DateRange[] = [
        {
          startDate: new Date(2022, 10, 7),
          endDate: new Date(2022, 10, 14),
          type: 'holiday',
        } as DateRange,
      ]
      const expectedPaginatedAbsences: PaginatedListDto<DateRange> = {
        data: absences,
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalPages: 1,
          totalItems: 1,
        },
      }

      service.getAbsencesByEmployeeId.mockResolvedValue(absences)
      service.absenceTableSize.mockResolvedValue(1)
      paginationService.createPagination.mockReturnValue(expectedPaginatedAbsences)

      const paginatedAbsences = controller.getAbsencesByEmployeeId('1')

      expect(logger.log).toHaveBeenCalledWith('Absences are fetched for employee with pagination', {
        id: '1',
        limit: 50,
        offset: 0,
      })
      expect(service.getAbsencesByEmployeeId).toHaveBeenCalledWith('1', { limit: 50, offset: 0 })
      return expect(paginatedAbsences).resolves.toBe(expectedPaginatedAbsences)
    })
  })
})
