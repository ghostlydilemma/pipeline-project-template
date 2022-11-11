import { DateRangeDto, PaginatedListDto, PaginationQueryDto } from '@pipeline-project-template/api-interfaces'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { EmployeeAbsenceHttpService } from './employee-absence-http.service'
import { TestBed } from '@angular/core/testing'
import { firstValueFrom } from 'rxjs'

describe('EmployeeAbsenceHttpService', () => {
  let service: EmployeeAbsenceHttpService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    })

    service = TestBed.inject(EmployeeAbsenceHttpService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  describe('Absence by Employee id', () => {
    it('should get absence by employee id without pagination', () => {
      const expectedUrl = 'http://localhost:3000/api/employee/1/absence?offset=undefined&limit=undefined'
      const expectedPaginatedAbsences: PaginatedListDto<DateRangeDto> = {
        data: [
          {
            startDate: new Date(2022, 10, 7),
            endDate: new Date(2022, 10, 14),
            type: 'holiday',
          } as DateRangeDto,
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalItems: 1,
          totalPages: 1,
        },
      }
      const paginatedAbsences = firstValueFrom(service.getAbsencesByEmployeeId('1'))

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedPaginatedAbsences)

      expect(req.request.method).toBe('GET')
      return expect(paginatedAbsences).resolves.toBe(expectedPaginatedAbsences)
    })

    it('should get absence by employee id with pagination', () => {
      const expectedUrl = 'http://localhost:3000/api/employee/1/absence?offset=15&limit=15'
      const expectedPaginatedAbsences: PaginatedListDto<DateRangeDto> = {
        data: [
          {
            startDate: new Date(2022, 10, 7),
            endDate: new Date(2022, 10, 14),
            type: 'holiday',
          } as DateRangeDto,
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalItems: 1,
          totalPages: 1,
        },
      }
      const paginationQuery: PaginationQueryDto = {
        offset: 15,
        limit: 15,
      }
      const paginatedAbsences = firstValueFrom(service.getAbsencesByEmployeeId('1', paginationQuery))

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedPaginatedAbsences)

      expect(req.request.method).toBe('GET')
      return expect(paginatedAbsences).resolves.toBe(expectedPaginatedAbsences)
    })
  })
})
