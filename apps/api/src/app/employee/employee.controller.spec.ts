import {
  CreateEmployeeDto,
  PaginatedListDto,
  PaginationQueryDto,
  UpdateEmployeeDto,
} from '@pipeline-project-template/api-interfaces'
import { DateRange, Department, Employee } from '@prisma/client'
import { MockProxy, mock } from 'jest-mock-extended'
import { Test, TestingModule } from '@nestjs/testing'

import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { Logger } from '@nestjs/common'
import { PaginationService } from '../pagination/pagination.service'

describe('EmployeeController', () => {
  let controller: EmployeeController
  let logger: MockProxy<Logger>
  let service: MockProxy<EmployeeService>
  let paginationService: MockProxy<PaginationService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
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

    controller = module.get(EmployeeController)
    logger = module.get(Logger)
    service = module.get(EmployeeService)
    paginationService = module.get(PaginationService)
  })

  describe('Get employees', () => {
    it('should fetch all employees', () => {
      const employees: Employee[] = [
        {
          id: '1',
        } as Employee,
      ]
      const expectedPaginatedEmployees: PaginatedListDto<Employee> = {
        data: employees,
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalPages: 1,
          totalItems: 1,
        },
      }
      service.getAllEmployees.mockResolvedValue(employees)
      service.tableSize.mockResolvedValue(1)
      paginationService.createPagination.mockReturnValue(expectedPaginatedEmployees)

      const paginatedEmployees = controller.getAllEmployees()

      expect(service.getAllEmployees).toHaveBeenCalledWith({ limit: 50, offset: 0 })
      return expect(paginatedEmployees).resolves.toBe(expectedPaginatedEmployees)
    })

    it('should fetch all employees with pagination option', () => {
      const employees: Employee[] = [
        {
          id: '1',
        } as Employee,
      ]
      const expectedPaginatedEmployees: PaginatedListDto<Employee> = {
        data: employees,
        meta: {
          currentPage: 0,
          itemsPerPage: 1,
          totalPages: 1,
          totalItems: 1,
        },
      }
      const paginationOptions: PaginationQueryDto = {
        offset: 0,
        limit: 10,
      }
      service.getAllEmployees.mockResolvedValue(employees)
      service.tableSize.mockResolvedValue(1)
      paginationService.createPagination.mockReturnValue(expectedPaginatedEmployees)

      const paginatedEmployees = controller.getAllEmployees(paginationOptions.limit, paginationOptions.offset)

      expect(service.getAllEmployees).toHaveBeenCalledWith({ limit: 10, offset: 0 })
      return expect(paginatedEmployees).resolves.toBe(expectedPaginatedEmployees)
    })
  })

  it('should fetch the requested employee', () => {
    const expectedEmployee = { id: '1' } as Employee
    service.getEmployeeById.mockResolvedValue(expectedEmployee)

    const employee = controller.getEmployeeById('1')

    expect(employee).resolves.toBe(expectedEmployee)
    return expect(service.getEmployeeById).toHaveBeenCalledWith('1')
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
    const expectedCreatedEmployee: Employee = {
      ...employee,
      id: '1',
      isActive: true,
      dateOfBirth: new Date('2004-06-17T19:16:30Z'),
      departmentId: '1',
    }
    service.createEmployee.mockResolvedValue(expectedCreatedEmployee)

    const createdEmployee = controller.createEmployee(employee)

    expect(service.createEmployee).toHaveBeenCalledWith({
      ...employee,
      department: {
        connect: {
          id: employee.department,
        },
      },
      isActive: true,
      activeInCompany: {
        create: {
          startDate: new Date(2022, 10, 10, 4, 30, 5, 10).toISOString(),
          type: 'employment',
        },
      },
    })
    return expect(createdEmployee).resolves.toBe(expectedCreatedEmployee)
  })

  describe('Update Employee', () => {
    it('should update an employee', () => {
      const employeeId = '1'
      const updateEmployee: UpdateEmployeeDto = {
        firstname: 'New Firstname',
      }
      const expectedUpdatedEmployee: Employee = {
        ...updateEmployee,
        id: '1',
        isActive: true,
        dateOfBirth: new Date('2004-06-17T19:16:30Z'),
        departmentId: '1',
      } as Employee
      service.updateEmployee.mockResolvedValue(expectedUpdatedEmployee)

      const updatedEmployee = controller.updateEmployee(employeeId, updateEmployee)

      expect(service.updateEmployee).toHaveBeenCalledWith({
        employeeId,
        data: {
          ...updateEmployee,
          department: undefined,
        },
      })
      return expect(updatedEmployee).resolves.toBe(expectedUpdatedEmployee)
    })

    it('should update an employee with department update', () => {
      const employeeId = '1'
      const updateEmployee: UpdateEmployeeDto = {
        firstname: 'New Firstname',
        department: '2',
      }
      const expectedUpdatedEmployee: Employee = {
        ...updateEmployee,
        id: '1',
        isActive: true,
        dateOfBirth: new Date('2004-06-17T19:16:30Z'),
        departmentId: '2',
      } as Employee
      service.updateEmployee.mockResolvedValue(expectedUpdatedEmployee)

      const updatedEmployee = controller.updateEmployee(employeeId, updateEmployee)

      expect(service.updateEmployee).toHaveBeenCalledWith({
        employeeId,
        data: {
          ...updateEmployee,
          department: {
            connect: {
              id: '2',
            },
          },
        },
      })
      return expect(updatedEmployee).resolves.toBe(expectedUpdatedEmployee)
    })
  })

  it('should unemploy an employee', () => {
    const expectedUnemployedEmployee: Employee = {
      id: '1',
    } as Employee
    service.unemployEmployee.mockResolvedValue(expectedUnemployedEmployee)

    const unemployedEmployee = controller.unemployEmployee('1')

    expect(logger.log).toHaveBeenCalledWith('An employee is unemployed', {
      id: '1',
    })
    expect(service.unemployEmployee).toHaveBeenCalledWith('1')
    return expect(unemployedEmployee).resolves.toBe(expectedUnemployedEmployee)
  })

  it('should reemploy an employee', () => {
    const expectedReemployedEmployee: Employee = {
      id: '1',
    } as Employee
    service.reemployEmployee.mockResolvedValue(expectedReemployedEmployee)

    const reemployedEmployee = controller.reemployEmployee('1')

    expect(logger.log).toHaveBeenCalledWith('An employee is reemployed', {
      id: '1',
    })
    expect(service.reemployEmployee).toHaveBeenCalledWith('1')
    return expect(reemployedEmployee).resolves.toBe(expectedReemployedEmployee)
  })

  describe('Average Salary', () => {
    it('should fetch the average salaries of all employees', () => {
      const expectedSalary = 5000
      service.getAverageSalaryStatistic.mockResolvedValue(expectedSalary)

      const averageSalary = controller.getAverageSalaryStatistic()

      expect(logger.log).toHaveBeenCalledWith('Average Salary has been calculated', {
        departmentId: undefined,
      })
      expect(service.getAverageSalaryStatistic).toHaveBeenCalledWith(undefined)
      return expect(averageSalary).resolves.toBe(expectedSalary)
    })

    it('should fetch the average salaries of all employees in the HR deployment', () => {
      const departmentId = '1'
      const expectedSalary = 5000
      service.getAverageSalaryStatistic.mockResolvedValue(expectedSalary)

      const averageSalary = controller.getAverageSalaryStatistic(departmentId)

      expect(logger.log).toHaveBeenCalledWith('Average Salary has been calculated', {
        departmentId: '1',
      })
      expect(service.getAverageSalaryStatistic).toHaveBeenCalledWith(departmentId)
      return expect(averageSalary).resolves.toBe(expectedSalary)
    })
  })

  describe('Employment statistics', () => {
    it('should get employment statistics for all employees', () => {
      const expectEmploymentStatistics: (DateRange & { employee: Employee & { department: Department } })[] = [
        {
          id: '1',
          startDate: new Date(2022, 10, 10),
          endDate: new Date(2022, 10, 11),
          employee: {
            id: '1',
            department: {
              id: '1',
            },
            departmentId: '1',
          },
          employeeId: '1',
        } as DateRange & { employee: Employee & { department: Department } },
      ]
      service.getEmploymentChangeStatistic.mockResolvedValue(expectEmploymentStatistics)

      const employmentStats = controller.getEmploymentChangeStatistic()

      expect(service.getEmploymentChangeStatistic).toHaveBeenCalledWith(
        undefined,
        new Date(2022, 10, 10, 4, 30, 5, 10),
        new Date(null)
      )
      expect(logger.log).toHaveBeenCalledWith('Employment Stats have been gathered', {
        departmentId: undefined,
        dateTo: undefined,
        dateFrom: undefined,
      })
      return expect(employmentStats).resolves.toBe(expectEmploymentStatistics)
    })

    it('should get employment statistics for all employees in the HR department', () => {
      const expectEmploymentStatistics: (DateRange & { employee: Employee & { department: Department } })[] = [
        {
          id: '1',
          startDate: new Date(2022, 10, 10),
          endDate: new Date(2022, 10, 11),
          employee: {
            id: '1',
            department: {
              id: '1',
              name: 'HR',
            },
            departmentId: '1',
          },
          employeeId: '1',
        } as DateRange & { employee: Employee & { department: Department } },
      ]
      service.getEmploymentChangeStatistic.mockResolvedValue(expectEmploymentStatistics)

      const employmentStats = controller.getEmploymentChangeStatistic('1')

      expect(service.getEmploymentChangeStatistic).toHaveBeenCalledWith(
        '1',
        new Date(2022, 10, 10, 4, 30, 5, 10),
        new Date(null)
      )
      expect(logger.log).toHaveBeenCalledWith('Employment Stats have been gathered', {
        departmentId: '1',
        dateTo: undefined,
        dateFrom: undefined,
      })
      expect(employmentStats).resolves.toBe(expectEmploymentStatistics)
    })

    it('should get employment statistics for all employees in the HR department in a given date range', () => {
      const expectEmploymentStatistics: (DateRange & { employee: Employee & { department: Department } })[] = [
        {
          id: '1',
          startDate: new Date(2022, 10, 10),
          endDate: new Date(2022, 10, 11),
          employee: {
            id: '1',
            department: {
              id: '1',
            },
            departmentId: '1',
          },
          employeeId: '1',
        } as DateRange & { employee: Employee & { department: Department } },
      ]
      service.getEmploymentChangeStatistic.mockResolvedValue(expectEmploymentStatistics)

      const employmentStats = controller.getEmploymentChangeStatistic(
        '1',
        new Date(2022, 10, 10).toISOString(),
        new Date(2022, 10, 11).toISOString()
      )

      expect(service.getEmploymentChangeStatistic).toHaveBeenCalledWith(
        '1',
        new Date(2022, 10, 10),
        new Date(2022, 10, 11)
      )
      expect(logger.log).toHaveBeenCalledWith('Employment Stats have been gathered', {
        departmentId: '1',
        dateTo: new Date(2022, 10, 10).toISOString(),
        dateFrom: new Date(2022, 10, 11).toISOString(),
      })
      return expect(employmentStats).resolves.toBe(expectEmploymentStatistics)
    })

    it('should get employment statistics for employees in a given date range', () => {
      const expectEmploymentStatistics: (DateRange & { employee: Employee & { department: Department } })[] = [
        {
          id: '1',
          startDate: new Date(2022, 10, 10),
          endDate: new Date(2022, 10, 11),
          employee: {
            id: '1',
            department: {
              id: '1',
            },
            departmentId: '1',
          },
          employeeId: '1',
        } as DateRange & { employee: Employee & { department: Department } },
      ]
      service.getEmploymentChangeStatistic.mockResolvedValue(expectEmploymentStatistics)

      const employmentStats = controller.getEmploymentChangeStatistic(
        undefined,
        new Date(2022, 10, 10).toISOString(),
        undefined
      )

      expect(service.getEmploymentChangeStatistic).toHaveBeenCalledWith(
        undefined,
        new Date(2022, 10, 10),
        new Date(null)
      )
      expect(logger.log).toHaveBeenCalledWith('Employment Stats have been gathered', {
        departmentId: undefined,
        dateTo: new Date(2022, 10, 10).toISOString(),
        dateFrom: undefined,
      })
      return expect(employmentStats).resolves.toBe(expectEmploymentStatistics)
    })
  })
})
