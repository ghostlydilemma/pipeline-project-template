import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateRangeEmploymentStatus, SortedEmploymentStats } from '../../../date-range-helper-types'
import { MockProxy, mock } from 'jest-mock-extended'

import { DepartmentService } from '../../../../department/service/department.service'
import { EmployeeEmploymentStatisticsDialogComponent } from './employee-employment-statistics-dialog.component'
import { EmployeeService } from '../../../service/employee.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'

const DEPARTMENTS = [{ id: '1', name: 'Test 1' }]

describe('EmployeeEmploymentStatisticsDialog', () => {
  let component: EmployeeEmploymentStatisticsDialogComponent
  let fixture: ComponentFixture<EmployeeEmploymentStatisticsDialogComponent>
  let departmentService: MockProxy<DepartmentService>
  let employeeService: MockProxy<EmployeeService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeEmploymentStatisticsDialogComponent],
      providers: [
        {
          provide: EmployeeService,
          useFactory: () => mock(),
        },
        {
          provide: DepartmentService,
          useFactory: () => mock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeEmploymentStatisticsDialogComponent)
    component = fixture.componentInstance

    departmentService = TestBed.inject(DepartmentService) as MockProxy<DepartmentService>
    departmentService.getAllDepartments.mockReturnValue(of(DEPARTMENTS))
    employeeService = TestBed.inject(EmployeeService) as MockProxy<EmployeeService>

    fixture.detectChanges()
  })

  it('should fetch all departments', () => {
    departmentService.getAllDepartments.mockReturnValue(of(DEPARTMENTS))

    component.ngOnInit()

    expect(component.departments).toBe(DEPARTMENTS)
  })

  it('should fetch all changes in Employment', () => {
    const departmentId = '1'
    const dateFrom = new Date(2022, 10, 10)
    const dateTo = new Date(2022, 12, 12)
    departmentService.getAllDepartments.mockReturnValue(of([{ id: '1', name: 'Test 1' }]))
    const sortedEmploymentStats: SortedEmploymentStats = {
      incoming: [
        {
          id: '1',
          employee: {
            id: '1',
            firstname: 'Cool',
            middlename: 'Test',
            lastname: 'Name',
            departmentId: '1',
            salary: 1000,
            address: 'Address',
            dateOfBirth: new Date(1992, 10, 10),
            isActive: true,
            department: {
              id: '1',
              name: 'Test',
            },
          },
          status: DateRangeEmploymentStatus.INCOMING,
          endDate: null,
          startDate: new Date(2022, 10, 11),
          employeeId: '1',
          type: 'employment',
        },
      ],
      outgoing: [
        {
          id: '2',
          employee: {
            id: '2',
            firstname: 'Cooler',
            middlename: 'Test',
            lastname: 'Name',
            departmentId: '1',
            salary: 1000,
            address: 'Address',
            dateOfBirth: new Date(1992, 10, 10),
            isActive: true,
            department: {
              id: '1',
              name: 'Test',
            },
          },
          status: DateRangeEmploymentStatus.INCOMING,
          endDate: new Date(2022, 12, 11),
          startDate: new Date(2021, 10, 9),
          employeeId: '2',
          type: 'employment',
        },
      ],
      both: [
        {
          id: '3',
          employee: {
            id: '3',
            firstname: 'Coolest',
            middlename: 'Test',
            lastname: 'Name',
            departmentId: '1',
            salary: 1000,
            address: 'Address',
            dateOfBirth: new Date(1992, 10, 10),
            isActive: true,
            department: {
              id: '1',
              name: 'Test',
            },
          },
          status: DateRangeEmploymentStatus.INCOMING,
          endDate: new Date(2022, 12, 11),
          startDate: new Date(2021, 10, 11),
          employeeId: '2',
          type: 'employment',
        },
      ],
      none: [],
    }
    component.departmentId$.next(departmentId)
    component.dateFrom$.next(dateFrom)
    component.dateTo$.next(dateTo)
    employeeService.getEmploymentChangeStatistic.mockReturnValue(of(sortedEmploymentStats))

    component.ngOnInit()

    expect(component.isLoadingResults).toBe(false)
    expect(component.employmentStats).toBe(sortedEmploymentStats)
    expect(employeeService.getEmploymentChangeStatistic).toHaveBeenCalledWith(departmentId, {
      startDate: dateFrom,
      endDate: dateTo,
    })
  })
})
