import {
  CreateEmployeeDto,
  DateRangeIncludingEmployeeAndDepartment,
  DepartmentDto,
  EmployeeDto,
  PaginatedListDto,
  PaginationQueryDto,
  SearchDateRangeDto,
  UpdateEmployeeDto,
} from '@pipeline-project-template/api-interfaces'
import { DateRangeEmploymentStatus, SortedEmploymentStats } from '../date-range-helper-types'
import { Department, Employee } from '@prisma/client'
import { MockProxy, mock } from 'jest-mock-extended'
import { firstValueFrom, of } from 'rxjs'

import { EmployeeHttpService } from './employee-http.service'
import { EmployeeService } from './employee.service'
import { TestBed } from '@angular/core/testing'

describe('EmployeeService', () => {
  let service: EmployeeService
  let employeeHttpService: MockProxy<EmployeeHttpService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        {
          provide: EmployeeHttpService,
          useFactory: () => mock(),
        },
      ],
    })

    const fakeDate = new Date(2022, 9, 10, 4, 30, 5, 10)
    jest.useFakeTimers().setSystemTime(fakeDate)

    service = TestBed.inject(EmployeeService)
    employeeHttpService = TestBed.inject(EmployeeHttpService) as MockProxy<EmployeeHttpService>
  })

  describe('Get employees', () => {
    it('should fetch all employees', () => {
      const expectedPaginatedEmployees: PaginatedListDto<EmployeeDto> = {
        data: [
          {
            id: '1',
          } as EmployeeDto,
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalItems: 1,
          totalPages: 1,
        },
      }

      employeeHttpService.getAllEmployees.mockReturnValue(of(expectedPaginatedEmployees))

      const paginatedEmployees = firstValueFrom(service.getAllEmployees())

      expect(employeeHttpService.getAllEmployees).toHaveBeenCalledWith(undefined)
      return expect(paginatedEmployees).resolves.toBe(expectedPaginatedEmployees)
    })

    it('should fetch all employees with pagination option', () => {
      const expectedPaginatedEmployees: PaginatedListDto<EmployeeDto> = {
        data: [
          {
            id: '1',
          } as EmployeeDto,
        ],
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalItems: 1,
          totalPages: 1,
        },
      }
      const paginationOptions: PaginationQueryDto = {
        offset: 0,
        limit: 10,
      }

      employeeHttpService.getAllEmployees.mockReturnValue(of(expectedPaginatedEmployees))

      const paginatedEmployees = firstValueFrom(service.getAllEmployees(paginationOptions))

      expect(employeeHttpService.getAllEmployees).toHaveBeenCalledWith(paginationOptions)
      return expect(paginatedEmployees).resolves.toBe(expectedPaginatedEmployees)
    })
  })

  it('should fetch the requested employee', () => {
    const expectedEmployee = { id: '1' } as EmployeeDto
    employeeHttpService.getEmployeeById.mockReturnValue(of(expectedEmployee))

    const employee = firstValueFrom(service.getEmployeeById('1'))

    expect(employee).resolves.toBe(expectedEmployee)
    return expect(employeeHttpService.getEmployeeById).toHaveBeenCalledWith('1')
  })

  it('should create an employee', () => {
    const employee: CreateEmployeeDto = {
      firstname: 'TestNew',
      middlename: 'TestNew',
      lastname: 'B-Test',
      address: 'TestNew Address',
      dateOfBirth: new Date('2004-06-17T19:16:30Z'),
      salary: 5678,
      department: '2',
    }
    const expectedCreatedEmployee: EmployeeDto = {
      ...employee,
      id: '1',
      isActive: true,
      activeInCompany: [{ startDate: new Date(), type: 'employment' }],
      dateOfBirth: new Date('2004-06-17T19:16:30Z'),
      department: { id: '1' } as DepartmentDto,
    }
    employeeHttpService.createEmployee.mockReturnValue(of(expectedCreatedEmployee))

    const createdEmployee = firstValueFrom(service.createEmployee(employee))

    expect(employeeHttpService.createEmployee).toHaveBeenCalledWith(employee)
    return expect(createdEmployee).resolves.toBe(expectedCreatedEmployee)
  })

  it('should update an employee', () => {
    const employeeId = '1'
    const updateEmployee: UpdateEmployeeDto = {
      firstname: 'New Firstname',
    }
    const expectedUpdatedEmployee: EmployeeDto = {
      ...updateEmployee,
      id: '1',
      isActive: true,
      activeInCompany: [{ startDate: new Date() }],
      dateOfBirth: new Date('2004-06-17T19:16:30Z'),
      department: { id: '1' } as DepartmentDto,
    } as EmployeeDto
    employeeHttpService.updateEmployee.mockReturnValue(of(expectedUpdatedEmployee))

    const updatedEmployee = firstValueFrom(service.updateEmployee(employeeId, updateEmployee))

    expect(employeeHttpService.updateEmployee).toHaveBeenCalledWith(employeeId, updateEmployee)
    return expect(updatedEmployee).resolves.toBe(expectedUpdatedEmployee)
  })

  it('should unemploy an employee', () => {
    const expectedUnemployedEmployee: EmployeeDto = {
      id: '1',
    } as EmployeeDto
    employeeHttpService.unemployEmployee.mockReturnValue(of(expectedUnemployedEmployee))

    const unemployedEmployee = firstValueFrom(service.unemployEmployee('1'))

    expect(employeeHttpService.unemployEmployee).toHaveBeenCalledWith('1')
    return expect(unemployedEmployee).resolves.toBe(expectedUnemployedEmployee)
  })

  it('should reemploy an employee', () => {
    const expectedReemployedEmployee: EmployeeDto = {
      id: '1',
    } as EmployeeDto
    employeeHttpService.reemployEmployee.mockReturnValue(of(expectedReemployedEmployee))

    const reemployedEmployee = firstValueFrom(service.reemployEmployee('1'))

    expect(employeeHttpService.reemployEmployee).toHaveBeenCalledWith('1')
    return expect(reemployedEmployee).resolves.toBe(expectedReemployedEmployee)
  })

  describe('Average Salary', () => {
    it('should fetch the average salaries of all employees', () => {
      const expectedSalary = 5000
      employeeHttpService.getAverageSalaryStatistic.mockReturnValue(of(expectedSalary))

      const averageSalary = firstValueFrom(service.getAverageSalaryStatistic())

      expect(employeeHttpService.getAverageSalaryStatistic).toHaveBeenCalledWith(undefined)
      return expect(averageSalary).resolves.toBe(expectedSalary)
    })

    it('should fetch the average salaries of all employees in the HR deployment', () => {
      const departmentId = '1'
      const expectedSalary = 5000
      employeeHttpService.getAverageSalaryStatistic.mockReturnValue(of(expectedSalary))

      const averageSalary = firstValueFrom(service.getAverageSalaryStatistic(departmentId))

      expect(employeeHttpService.getAverageSalaryStatistic).toHaveBeenCalledWith(departmentId)
      return expect(averageSalary).resolves.toBe(expectedSalary)
    })
  })

  describe('Employee Stats', () => {
    it('should fetch employment stats and properly sort them into INCOMING', () => {
      const stats: DateRangeIncludingEmployeeAndDepartment = {
        id: '1',
        startDate: new Date(2022, 9, 10),
        endDate: null,
        employee: {
          id: '1',
        } as Employee & { department: Department },
        employeeId: '1',
        type: 'employment',
      }
      const expectedStats: SortedEmploymentStats = {
        incoming: [{ ...stats, status: DateRangeEmploymentStatus.INCOMING }],
        outgoing: [],
        both: [],
        none: [],
      }
      const daterange: SearchDateRangeDto = {
        startDate: new Date(2022, 8, 10),
      }
      employeeHttpService.getEmploymentChangeStatistic.mockReturnValue(of([stats]))

      const mappedEmployeeStats = firstValueFrom(service.getEmploymentChangeStatistic('1', daterange))

      expect(employeeHttpService.getEmploymentChangeStatistic).toHaveBeenCalledWith('1', daterange)
      return expect(mappedEmployeeStats).resolves.toStrictEqual(expectedStats)
    })

    it('should fetch employment stats and properly sort them into OUTGOING', () => {
      const stats: DateRangeIncludingEmployeeAndDepartment = {
        id: '1',
        startDate: new Date(2022, 5, 10),
        endDate: new Date(2022, 7, 9),
        employee: {
          id: '1',
        } as Employee & { department: Department },
        employeeId: '1',
        type: 'employment',
      }
      const expectedStats: SortedEmploymentStats = {
        incoming: [],
        outgoing: [{ ...stats, status: DateRangeEmploymentStatus.OUTGOING }],
        both: [],
        none: [],
      }
      const daterange: SearchDateRangeDto = {
        startDate: new Date(2022, 6, 10),
        endDate: new Date(2022, 7, 10),
      }
      employeeHttpService.getEmploymentChangeStatistic.mockReturnValue(of([stats]))

      const mappedEmployeeStats = firstValueFrom(service.getEmploymentChangeStatistic('1', daterange))

      expect(employeeHttpService.getEmploymentChangeStatistic).toHaveBeenCalledWith('1', daterange)
      return expect(mappedEmployeeStats).resolves.toStrictEqual(expectedStats)
    })

    it('should fetch employment stats and properly sort them into BOTH', () => {
      const stats: DateRangeIncludingEmployeeAndDepartment = {
        id: '1',
        startDate: new Date(2022, 5, 10),
        endDate: new Date(2022, 7, 9),
        employee: {
          id: '1',
        } as Employee & { department: Department },
        employeeId: '1',
        type: 'employment',
      }
      const expectedStats: SortedEmploymentStats = {
        incoming: [],
        outgoing: [],
        both: [{ ...stats, status: DateRangeEmploymentStatus.BOTH }],
        none: [],
      }
      const daterange: SearchDateRangeDto = {
        startDate: new Date(2022, 4, 10),
        endDate: new Date(2022, 7, 10),
      }
      employeeHttpService.getEmploymentChangeStatistic.mockReturnValue(of([stats]))

      const mappedEmployeeStats = firstValueFrom(service.getEmploymentChangeStatistic('1', daterange))

      expect(employeeHttpService.getEmploymentChangeStatistic).toHaveBeenCalledWith('1', daterange)
      return expect(mappedEmployeeStats).resolves.toStrictEqual(expectedStats)
    })
  })
})
