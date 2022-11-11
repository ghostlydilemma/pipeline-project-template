import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateRangeDto, PaginatedListDto, PaginationQueryDto } from '@pipeline-project-template/api-interfaces'
import { MockProxy, mock } from 'jest-mock-extended'

import { EmployeeAbsenceOverviewComponent } from './employee-absence-overview.component'
import { EmployeeAbsenceService } from '../service/employee-absence.service'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'

describe('EmployeeAbsenceOverviewComponent', () => {
  let component: EmployeeAbsenceOverviewComponent
  let fixture: ComponentFixture<EmployeeAbsenceOverviewComponent>
  let absenceService: MockProxy<EmployeeAbsenceService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, MatTableModule],
      declarations: [EmployeeAbsenceOverviewComponent],
      providers: [
        {
          provide: EmployeeAbsenceService,
          useFactory: () => mock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeAbsenceOverviewComponent)
    component = fixture.componentInstance
    component.employeeId = '1'
    fixture.detectChanges()
    absenceService = TestBed.inject(EmployeeAbsenceService) as MockProxy<EmployeeAbsenceService>
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Loading Absences', () => {
    it('should fetch 15 absences from the first page', () => {
      const expectedPaginationOptions: PaginationQueryDto = {
        offset: 0,
        limit: 8,
      }
      const data: PaginatedListDto<DateRangeDto> = {
        data: [
          {
            type: 'holiday',
          } as DateRangeDto,
          {
            type: 'illness',
          } as DateRangeDto,
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 2,
          totalItems: 2,
          totalPages: 1,
        },
      }
      absenceService.getAbsencesByEmployeeId.mockReturnValue(of(data))

      component.ngAfterViewInit()

      expect(component.resultsLength).toBe(2)
      expect(component.data).toBe(data.data)
      expect(component.isLoadingResults).toBe(false)
      expect(absenceService.getAbsencesByEmployeeId).toHaveBeenCalledWith('1', expectedPaginationOptions)
    })
  })
})
