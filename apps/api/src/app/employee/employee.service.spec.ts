import { DateRange, Department, Employee, Prisma, PrismaClient } from '@prisma/client'
import { DeepMockProxy, MockProxy, mock, mockDeep } from 'jest-mock-extended'
import { Test, TestingModule } from '@nestjs/testing'

import { DateRangeIncludingEmployeeAndDepartment } from '@pipeline-project-template/api-interfaces'
import { EmployeeService } from './employee.service'
import { Logger } from '@nestjs/common'
import { PaginationQueryDto } from '@pipeline-project-template/api-interfaces'
import { PrismaService } from '../prisma/prisma.service'

describe('EmployeeService', () => {
  let service: EmployeeService
  let logger: MockProxy<Logger>
  let prisma: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService, PrismaService, { provide: Logger, useFactory: () => mock() }],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile()

    service = module.get(EmployeeService)
    logger = module.get(Logger)
    prisma = module.get(PrismaService)

    const fakeDate = new Date(2022, 9, 10, 4, 30, 5, 10)
    jest.useFakeTimers().setSystemTime(fakeDate)
  })

  describe('Get employees', () => {
    it('should fetch all employees', () => {
      const expectedEmployees: Employee[] = [
        {
          id: '1',
        } as Employee,
      ]
      prisma.employee.findMany.mockResolvedValue(expectedEmployees)

      const employees = service.getAllEmployees({})

      expect(prisma.employee.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        include: {
          department: true,
          activeInCompany: {
            orderBy: {
              startDate: 'asc',
            },
            where: {
              type: 'employment',
            },
          },
        },
        orderBy: [
          {
            isActive: 'desc',
          },
          {
            lastname: 'asc',
          },
        ],
      })
      expect(logger.log).toHaveBeenCalledWith('All employees are fetched', {
        offset: undefined,
        limit: undefined,
      })
      return expect(employees).resolves.toBe(expectedEmployees)
    })

    it('should fetch all employees with pagination option', () => {
      const expectedEmployees: Employee[] = [
        {
          id: '1',
        } as Employee,
      ]
      const paginationOptions: PaginationQueryDto = {
        offset: 0,
        limit: 10,
      }
      prisma.employee.findMany.mockResolvedValue(expectedEmployees)

      const employees = service.getAllEmployees(paginationOptions)

      expect(prisma.employee.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: 10,
        include: {
          department: true,
          activeInCompany: {
            orderBy: {
              startDate: 'asc',
            },
            where: {
              type: 'employment',
            },
          },
        },
        orderBy: [
          {
            isActive: 'desc',
          },
          {
            lastname: 'asc',
          },
        ],
      })
      expect(logger.log).toHaveBeenCalledWith('All employees are fetched', {
        offset: 0,
        limit: 10,
      })
      return expect(employees).resolves.toBe(expectedEmployees)
    })
  })

  it('should fetch the requested employee', () => {
    const expectedEmployee: Employee = {
      id: '1',
    } as Employee
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.employee.findUnique.mockResolvedValue(expectedEmployee)

    const employees = service.getEmployeeById('1')

    expect(prisma.employee.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      include: {
        department: true,
        activeInCompany: {
          orderBy: {
            startDate: 'asc',
          },
          where: {
            type: 'employment',
          },
        },
      },
    })
    expect(logger.log).toHaveBeenCalledWith('An employee is fetched', {
      employeeId: '1',
    })
    return expect(employees).resolves.toBe(expectedEmployee)
  })

  it('should create an employee', () => {
    const expectedEmployee: Employee = {
      id: '1',
    } as Employee
    prisma.employee.create.mockResolvedValue(expectedEmployee)

    const employee = service.createEmployee({
      id: '1',
    } as Prisma.EmployeeCreateInput)

    expect(prisma.employee.create).toHaveBeenCalledWith({
      data: {
        id: '1',
      },
    })
    expect(logger.log).toHaveBeenCalledWith('An employees is created', {
      data: {
        id: '1',
      },
    })
    return expect(employee).resolves.toBe(expectedEmployee)
  })

  it('should update an employee', () => {
    const expectedEmployee: Employee = {
      firstname: 'New Firstname',
    } as Employee
    prisma.employee.update.mockResolvedValue(expectedEmployee)

    const employee = service.updateEmployee({
      employeeId: '1',
      data: {
        firstname: 'New Firstname',
      } as Prisma.EmployeeUpdateInput,
    })

    expect(prisma.employee.update).toHaveBeenCalledWith({
      data: {
        firstname: 'New Firstname',
      },
      where: {
        id: '1',
      },
    })
    expect(logger.log).toHaveBeenCalledWith('An employees is updated', {
      employeeId: '1',
      data: {
        firstname: 'New Firstname',
      },
    })
    return expect(employee).resolves.toBe(expectedEmployee)
  })

  it('should unemploy an employee', () => {
    const expectedEmployee = {
      id: '1',
    } as Employee
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.dateRange.findFirst.mockResolvedValue({
      endDate: null,
      id: '1',
    } as DateRange)
    prisma.employee.update.mockResolvedValue(expectedEmployee)

    const employee = service.unemployEmployee('1')

    expect(logger.log).toHaveBeenCalledWith('Latest date range for employee is fetched', {
      employeeId: '1',
    })
    return expect(employee).resolves.toBe(expectedEmployee)
  })

  it('should reemploy an employee', () => {
    const expectedEmployee = {
      id: '1',
    } as Employee
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.dateRange.findFirst.mockResolvedValue({
      startDate: new Date(2010, 10, 10),
      endDate: new Date(2022, 10, 10),
      id: '1',
    } as DateRange)
    prisma.employee.update.mockResolvedValue(expectedEmployee)

    const employee = service.reemployEmployee('1')

    expect(logger.log).toHaveBeenCalledWith('Latest date range for employee is fetched', {
      employeeId: '1',
    })
    return expect(employee).resolves.toBe(expectedEmployee)
  })

  describe('Average salary', () => {
    it('should calculate the average salary for all employees in the company', () => {
      type AggregateType = Prisma.GetEmployeeAggregateType<Prisma.EmployeeAggregateArgs>
      const expectedSalary = 5000
      const aggregateMockValue: AggregateType = {
        _avg: {
          salary: expectedSalary,
        },
      } as AggregateType

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prisma.employee.aggregate.mockResolvedValue(aggregateMockValue)

      const salary = service.getAverageSalaryStatistic()

      expect(prisma.employee.aggregate).toHaveBeenCalledWith({
        _avg: {
          salary: true,
        },
        where: {
          departmentId: undefined,
        },
      })
      expect(logger.log).toHaveBeenCalledWith('Average salary for all employees has been called', {
        departmentId: undefined,
      })
      expect(logger.log).toHaveBeenCalledWith('Average salary for all employees has been called', {
        departmentId: undefined,
      })
      return expect(salary).resolves.toBe(expectedSalary)
    })

    it('should calculate the average salary for all employees in the company with department HR', () => {
      type AggregateType = Prisma.GetEmployeeAggregateType<Prisma.EmployeeAggregateArgs>
      const expectedSalary = 5000
      const aggregateMockValue: AggregateType = {
        _avg: {
          salary: expectedSalary,
        },
      } as AggregateType
      const departmentId = '1'

      prisma.employee.aggregate.mockResolvedValue(aggregateMockValue)

      const salary = service.getAverageSalaryStatistic(departmentId)

      expect(prisma.employee.aggregate).toHaveBeenCalledWith({
        _avg: {
          salary: true,
        },
        where: {
          departmentId,
        },
      })
      expect(logger.log).toHaveBeenCalledWith('Average salary for all employees has been called', { departmentId })
      return expect(salary).resolves.toBe(expectedSalary)
    })
  })

  describe('Employment stats', () => {
    it('should fetch the employment stats for all employees in the company for all date ranges', () => {
      const fakeDate = new Date(2022, 9, 10, 4, 30, 5, 10)
      jest.useFakeTimers().setSystemTime(fakeDate)

      const fetchedDateRanges: DateRangeIncludingEmployeeAndDepartment[] = [
        {
          id: '1',
          startDate: new Date(),
          endDate: new Date(),
          employee: {
            id: '1',
            department: {
              id: '1',
              name: 'Test',
            },
          } as Employee & { department: Department },
          employeeId: '1',
          type: 'employment',
        },
      ]

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prisma.dateRange.findMany.mockReturnValue(fetchedDateRanges)

      const dataRanges = service.getEmploymentChangeStatistic()

      expect(prisma.dateRange.findMany).toHaveBeenCalledWith({
        where: {
          employee: {
            department: {
              id: undefined,
            },
          },
          type: 'employment',
          OR: [
            {
              endDate: {
                gte: new Date('1970-01-01T00:00:00.000Z'),
                lte: fakeDate,
              },
            },
            {
              startDate: {
                gte: new Date('1970-01-01T00:00:00.000Z'),
                lte: fakeDate,
              },
            },
          ],
        },
        include: {
          employee: {
            include: {
              department: true,
            },
          },
        },
      })
      expect(logger.log).toHaveBeenCalledWith('Employment Stats for all employees has been called', {
        departmentId: undefined,
        dateTo: fakeDate,
        dateFrom: new Date('1970-01-01T00:00:00.000Z'),
      })
      expect(dataRanges).resolves.toBe(fetchedDateRanges)
    })

    it('should fetch the employment stats for all employees in the company for all date ranges in department HR', () => {
      const fakeDate = new Date(2022, 9, 10, 4, 30, 5, 10)
      jest.useFakeTimers().setSystemTime(fakeDate)

      const fetchedDateRanges: DateRangeIncludingEmployeeAndDepartment[] = [
        {
          id: '1',
          startDate: new Date(),
          endDate: new Date(),
          employee: {
            id: '1',
            department: {
              id: '1',
              name: 'Test',
            },
          } as Employee & { department: Department },
          employeeId: '1',
          type: 'employment',
        },
      ]

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prisma.dateRange.findMany.mockReturnValue(fetchedDateRanges)

      const dataRanges = service.getEmploymentChangeStatistic('1')

      expect(prisma.dateRange.findMany).toHaveBeenCalledWith({
        where: {
          employee: {
            department: {
              id: '1',
            },
          },
          type: 'employment',
          OR: [
            {
              endDate: {
                gte: new Date('1970-01-01T00:00:00.000Z'),
                lte: fakeDate,
              },
            },
            {
              startDate: {
                gte: new Date('1970-01-01T00:00:00.000Z'),
                lte: fakeDate,
              },
            },
          ],
        },
        include: {
          employee: {
            include: {
              department: true,
            },
          },
        },
      })
      expect(logger.log).toHaveBeenCalledWith('Employment Stats for all employees has been called', {
        departmentId: '1',
        dateTo: fakeDate,
        dateFrom: new Date('1970-01-01T00:00:00.000Z'),
      })
      expect(dataRanges).resolves.toBe(fetchedDateRanges)
    })

    it('should fetch the employment stats for all employees in the company for a given date range', () => {
      const fetchedDateRanges: DateRangeIncludingEmployeeAndDepartment[] = [
        {
          id: '1',
          startDate: new Date(2022, 10, 10),
          endDate: new Date(2022, 10, 11),
          employee: {
            id: '1',
            department: {
              id: '1',
              name: 'Test',
            },
          } as Employee & { department: Department },
          employeeId: '1',
          type: 'employment',
        },
      ]

      prisma.dateRange.findMany.mockResolvedValue(fetchedDateRanges)

      const dataRanges = service.getEmploymentChangeStatistic('1', new Date(2022, 10, 11), new Date(2022, 10, 10))

      expect(prisma.dateRange.findMany).toHaveBeenCalledWith({
        where: {
          employee: {
            department: {
              id: '1',
            },
          },
          type: 'employment',
          OR: [
            {
              endDate: {
                gte: new Date(2022, 10, 10),
                lte: new Date(2022, 10, 11),
              },
            },
            {
              startDate: {
                gte: new Date(2022, 10, 10),
                lte: new Date(2022, 10, 11),
              },
            },
          ],
        },
        include: {
          employee: {
            include: {
              department: true,
            },
          },
        },
      })
      expect(logger.log).toHaveBeenCalledWith('Employment Stats for all employees has been called', {
        departmentId: '1',
        dateTo: new Date(2022, 10, 11),
        dateFrom: new Date(2022, 10, 10),
      })
      expect(dataRanges).resolves.toBe(fetchedDateRanges)
    })
  })
})
