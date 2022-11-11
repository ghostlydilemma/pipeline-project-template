import { MockProxy, mock } from 'jest-mock-extended'

import { DepartmentService } from '../../../../department/service/department.service'
import { EmployeeAverageSalaryStatisticsDialogComponent } from './employee-average-salary-statistics-dialog.component'
import { EmployeeService } from '../../../service/employee.service'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

describe('EmployeeAverageSalaryDialogComponent', () => {
  let component: EmployeeAverageSalaryStatisticsDialogComponent
  let employeeService: MockProxy<EmployeeService>
  let departmentService: MockProxy<DepartmentService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeAverageSalaryStatisticsDialogComponent,
        {
          provide: EmployeeService,
          useFactory: () => mock(),
        },
        {
          provide: DepartmentService,
          useFactory: () => mock(),
        },
      ],
    })

    component = TestBed.inject(EmployeeAverageSalaryStatisticsDialogComponent)
    employeeService = TestBed.inject(EmployeeService) as MockProxy<EmployeeService>
    departmentService = TestBed.inject(DepartmentService) as MockProxy<DepartmentService>
  })

  it('should fetch all departments', () => {
    const departments = [{ id: '1', name: 'Test 1' }]
    departmentService.getAllDepartments.mockReturnValue(of(departments))

    component.ngOnInit()

    expect(component.departments).toBe(departments)
  })

  it('should fetch the average salary for Department 1', () => {
    const departments = [{ id: '1', name: 'Test 1' }]
    departmentService.getAllDepartments.mockReturnValue(of(departments))
    const averageSalary = 1000.3294
    component.departmentId$.next('1')
    employeeService.getAverageSalaryStatistic.mockReturnValue(of(averageSalary))

    component.ngOnInit()

    expect(component.salary).toBe('1000.33')
  })
})
