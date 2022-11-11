import { DateRangeDto, PaginatedListDto, PaginationQueryDto } from '@pipeline-project-template/api-interfaces'
import { MockProxy, mock } from 'jest-mock-extended'
import { firstValueFrom, of } from 'rxjs'

import { EmployeeAbsenceHttpService } from './employee-absence-http.service'
import { EmployeeAbsenceService } from './employee-absence.service'
import { TestBed } from '@angular/core/testing'

describe('EmployeeAbsenceService', () => {
  let service: EmployeeAbsenceService
  let employeeAbsenceHttpService: MockProxy<EmployeeAbsenceHttpService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeAbsenceService,
        {
          provide: EmployeeAbsenceHttpService,
          useFactory: () => mock(),
        },
      ],
    })
    service = TestBed.inject(EmployeeAbsenceService)
    employeeAbsenceHttpService = TestBed.inject(EmployeeAbsenceHttpService) as MockProxy<EmployeeAbsenceHttpService>
  })

  describe('Get employee absences by employee id', () => {
    it('should fetch the requested employee absences by id with Pagination Query', () => {
      const expectedAbsences: PaginatedListDto<DateRangeDto> = {
        data: [
          {
            startDate: new Date(2022, 10, 7),
            endDate: new Date(2022, 10, 14),
            type: 'holiday',
          },
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalItems: 1,
          totalPages: 1,
        },
      }
      const paginationQuery: PaginationQueryDto = {
        offset: 0,
        limit: 15,
      }
      employeeAbsenceHttpService.getAbsencesByEmployeeId.mockReturnValue(of(expectedAbsences))

      const absences = firstValueFrom(service.getAbsencesByEmployeeId('1', paginationQuery))

      expect(employeeAbsenceHttpService.getAbsencesByEmployeeId).toHaveBeenCalledWith('1', paginationQuery)
      return expect(absences).resolves.toBe(expectedAbsences)
    })

    it('should fetch the requested employee absences by id without Pagination Query', () => {
      const expectedAbsences: PaginatedListDto<DateRangeDto> = {
        data: [
          {
            startDate: new Date(2022, 10, 7),
            endDate: new Date(2022, 10, 14),
            type: 'holiday',
          },
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalItems: 1,
          totalPages: 1,
        },
      }
      employeeAbsenceHttpService.getAbsencesByEmployeeId.mockReturnValue(of(expectedAbsences))

      const absences = firstValueFrom(service.getAbsencesByEmployeeId('1'))

      expect(employeeAbsenceHttpService.getAbsencesByEmployeeId).toHaveBeenCalledWith('1', undefined)
      return expect(absences).resolves.toBe(expectedAbsences)
    })
  })
})
