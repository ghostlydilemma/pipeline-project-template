import { ActivatedRoute, Router } from '@angular/router'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EmployeeDto, PaginatedListDto, PaginationQueryDto } from '@pipeline-project-template/api-interfaces'
import { MockProxy, mock } from 'jest-mock-extended'

import { EmployeeOverviewComponent } from './employee-overview.component'
import { EmployeeService } from '../service/employee.service'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'

describe('EmployeeTableComponent', () => {
  let component: EmployeeOverviewComponent
  let fixture: ComponentFixture<EmployeeOverviewComponent>
  let employeeService: MockProxy<EmployeeService>
  let route: MockProxy<ActivatedRoute>
  let router: MockProxy<Router>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, MatTableModule],
      declarations: [EmployeeOverviewComponent],
      providers: [
        {
          provide: EmployeeService,
          useFactory: () => mock(),
        },
        {
          provide: ActivatedRoute,
          useFactory: () => mock(),
        },
        {
          provide: Router,
          useFactory: () => mock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    employeeService = TestBed.inject(EmployeeService) as MockProxy<EmployeeService>
    route = TestBed.inject(ActivatedRoute) as MockProxy<ActivatedRoute>
    router = TestBed.inject(Router) as MockProxy<Router>
  })

  it('should navigate to the requested employee', () => {
    const employeeId = '1'

    component.navigateToEmployee(employeeId)

    expect(router.navigate).toHaveBeenCalledWith(['./', employeeId], {
      relativeTo: route,
    })
  })

  describe('Loading Employees', () => {
    it('should fetch 15 employees from the first page', () => {
      const expectedPaginationOptions: PaginationQueryDto = {
        offset: 0,
        limit: 15,
      }
      const data: PaginatedListDto<EmployeeDto> = {
        data: [
          {
            id: '1',
          } as EmployeeDto,
          {
            id: '2',
          } as EmployeeDto,
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 2,
          totalItems: 2,
          totalPages: 1,
        },
      }
      employeeService.getAllEmployees.mockReturnValue(of(data))

      component.ngAfterViewInit()

      expect(component.resultsLength).toBe(2)
      expect(component.data).toBe(data.data)
      expect(component.isLoadingResults).toBe(false)
      expect(employeeService.getAllEmployees).toHaveBeenCalledWith(expectedPaginationOptions)
    })
  })
})
