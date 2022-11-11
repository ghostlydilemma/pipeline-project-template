import {
  CreateEmployeeDto,
  DateRangeIncludingEmployeeAndDepartment,
  DepartmentDto,
  EmployeeDto,
  PaginatedListDto,
  PaginationQueryDto,
  UpdateEmployeeDto,
} from '@pipeline-project-template/api-interfaces'
import { Department, Employee } from '@prisma/client'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { EmployeeHttpService } from './employee-http.service'
import { TestBed } from '@angular/core/testing'
import { firstValueFrom } from 'rxjs'

describe('EmployeeHttpService', () => {
  let service: EmployeeHttpService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    })

    service = TestBed.inject(EmployeeHttpService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  describe('Get employees', () => {
    it('should fetch all employees', () => {
      const expectedUrl = 'http://localhost:3000/api/employee?offset=undefined&limit=undefined'
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
      const paginatedEmployees = firstValueFrom(service.getAllEmployees())

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedPaginatedEmployees)

      expect(req.request.method).toBe('GET')
      return expect(paginatedEmployees).resolves.toBe(expectedPaginatedEmployees)
    })

    it('should fetch all employees with pagination option', () => {
      const expectedUrl = 'http://localhost:3000/api/employee?offset=0&limit=10'
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
      const paginatedEmployees = firstValueFrom(service.getAllEmployees(paginationOptions))

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedPaginatedEmployees)

      expect(req.request.method).toBe('GET')
      return expect(paginatedEmployees).resolves.toBe(expectedPaginatedEmployees)
    })
  })

  it('should fetch the requested employee', () => {
    const expectedUrl = 'http://localhost:3000/api/employee?offset=undefined&limit=undefined'

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
    const paginatedEmployees = firstValueFrom(service.getAllEmployees())

    const req = httpTestingController.expectOne(expectedUrl)
    req.flush(expectedPaginatedEmployees)

    expect(req.request.method).toBe('GET')
    return expect(paginatedEmployees).resolves.toBe(expectedPaginatedEmployees)
  })

  it('should create an employee', () => {
    const expectedUrl = 'http://localhost:3000/api/employee'
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
    const createdEmployee = firstValueFrom(service.createEmployee(employee))

    const req = httpTestingController.expectOne(expectedUrl)
    req.flush(expectedCreatedEmployee)

    expect(req.request.method).toBe('POST')
    return expect(createdEmployee).resolves.toBe(expectedCreatedEmployee)
  })

  it('should update an employee', () => {
    const expectedUrl = 'http://localhost:3000/api/employee/1'
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
    const updatedEmployee = firstValueFrom(service.updateEmployee(employeeId, updateEmployee))

    const req = httpTestingController.expectOne(expectedUrl)
    req.flush(expectedUpdatedEmployee)

    expect(req.request.method).toBe('PUT')
    return expect(updatedEmployee).resolves.toBe(expectedUpdatedEmployee)
  })

  it('should unemploy an employee', () => {
    const expectedUrl = 'http://localhost:3000/api/employee/1/unemploy'
    const expectedUnemployedEmployee: EmployeeDto = {
      id: '1',
    } as EmployeeDto

    const unemployedEmployee = firstValueFrom(service.unemployEmployee('1'))

    const req = httpTestingController.expectOne(expectedUrl)
    req.flush(expectedUnemployedEmployee)

    expect(req.request.method).toBe('PATCH')
    return expect(unemployedEmployee).resolves.toBe(expectedUnemployedEmployee)
  })

  it('should reemploy an employee', () => {
    const expectedUrl = 'http://localhost:3000/api/employee/1/reemploy'
    const expectedReemployedEmployee: EmployeeDto = {
      id: '1',
    } as EmployeeDto

    const reemployedEmployee = firstValueFrom(service.reemployEmployee('1'))

    const req = httpTestingController.expectOne(expectedUrl)
    req.flush(expectedReemployedEmployee)

    expect(req.request.method).toBe('PATCH')
    return expect(reemployedEmployee).resolves.toBe(expectedReemployedEmployee)
  })

  describe('Average Salary', () => {
    it('fetch average salary for all employees of the company', () => {
      const expectedUrl = 'http://localhost:3000/api/employee/stats/salary'
      const salary = 5000

      const averageSalary = firstValueFrom(service.getAverageSalaryStatistic())

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(salary)

      expect(req.request.method).toBe('GET')
      return expect(averageSalary).resolves.toBe(salary)
    })

    it('fetch average salary for all employees of the company in the HR department', () => {
      const expectedUrl = 'http://localhost:3000/api/employee/stats/salary?department=1'
      const salary = 5000

      const averageSalary = firstValueFrom(service.getAverageSalaryStatistic('1'))

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(salary)

      expect(req.request.method).toBe('GET')
      return expect(averageSalary).resolves.toBe(salary)
    })
  })

  describe('Employment Statistics', () => {
    it('fetch employment statistics for all departments for all time', () => {
      const expectedUrl = 'http://localhost:3000/api/employee/stats/employment'
      const expectedEmploymentStats: DateRangeIncludingEmployeeAndDepartment[] = [
        {
          id: '1',
          employee: {
            id: '1',
          } as Employee & { department: Department },
          startDate: new Date(2022, 10, 10),
          endDate: null,
          employeeId: '1',
          type: 'employment',
        },
      ]
      const employmentStats = firstValueFrom(service.getEmploymentChangeStatistic())

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedEmploymentStats)

      expect(req.request.method).toBe('GET')
      return expect(employmentStats).resolves.toBe(expectedEmploymentStats)
    })

    it('fetch employment statistics for the HR department for all time', () => {
      const expectedUrl = 'http://localhost:3000/api/employee/stats/employment?department=1'
      const expectedEmploymentStats: DateRangeIncludingEmployeeAndDepartment[] = [
        {
          id: '1',
          employee: {
            id: '1',
            department: {
              id: '1',
            },
          } as Employee & { department: Department },
          startDate: new Date(2022, 10, 10),
          endDate: null,
          employeeId: '1',
          type: 'employment',
        },
      ]
      const employmentStats = firstValueFrom(service.getEmploymentChangeStatistic('1'))

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedEmploymentStats)

      expect(req.request.method).toBe('GET')
      return expect(employmentStats).resolves.toBe(expectedEmploymentStats)
    })

    it('fetch employment statistics for the HR department for a given time frame', () => {
      const expectedUrl =
        'http://localhost:3000/api/employee/stats/employment?department=1&dateFrom=2022-10-09T00:00:00.000Z&dateTo=2022-12-11T00:00:00.000Z'
      const expectedEmploymentStats: DateRangeIncludingEmployeeAndDepartment[] = [
        {
          id: '1',
          employee: {
            id: '1',
            department: {
              id: '1',
            },
          } as Employee & { department: Department },
          startDate: new Date(2022, 10, 10),
          endDate: null,
          employeeId: '1',
          type: 'employment',
        },
      ]
      const employmentStats = firstValueFrom(
        service.getEmploymentChangeStatistic('1', { startDate: new Date(2022, 9, 9), endDate: new Date(2022, 11, 11) })
      )

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedEmploymentStats)

      expect(req.request.method).toBe('GET')
      return expect(employmentStats).resolves.toBe(expectedEmploymentStats)
    })

    it('fetch employment statistics for all departments for a given time frame', () => {
      const expectedUrl =
        'http://localhost:3000/api/employee/stats/employment?dateFrom=2022-10-09T00:00:00.000Z&dateTo=2022-12-11T00:00:00.000Z'
      const expectedEmploymentStats: DateRangeIncludingEmployeeAndDepartment[] = [
        {
          id: '1',
          employee: {
            id: '1',
          } as Employee & { department: Department },
          startDate: new Date(2022, 10, 10),
          endDate: null,
          employeeId: '1',
          type: 'employment',
        },
      ]
      const employmentStats = firstValueFrom(
        service.getEmploymentChangeStatistic(undefined, {
          startDate: new Date(2022, 9, 9),
          endDate: new Date(2022, 11, 11),
        })
      )

      const req = httpTestingController.expectOne(expectedUrl)
      req.flush(expectedEmploymentStats)

      expect(req.request.method).toBe('GET')
      return expect(employmentStats).resolves.toBe(expectedEmploymentStats)
    })
  })

  afterEach(() => {
    httpTestingController.verify()
  })
})
