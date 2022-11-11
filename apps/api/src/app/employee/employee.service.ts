import { Employee, Prisma } from '@prisma/client'
import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  async getEmployeeById(employeeId: string): Promise<Employee | null> {
    this.logger.log('An employee is fetched', { employeeId })
    return this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        department: true,
        activeInCompany: {
          where: {
            type: 'employment',
          },
          orderBy: {
            startDate: 'asc',
          },
        },
      },
    })
  }

  async getAllEmployees(params: { offset?: number; limit?: number }): Promise<Employee[]> {
    const { offset, limit } = params
    this.logger.log('All employees are fetched', { offset, limit })
    return this.prisma.employee.findMany({
      skip: Number(offset) || undefined,
      take: Number(limit) || undefined,
      include: {
        department: true,
        activeInCompany: {
          where: {
            type: 'employment',
          },
          orderBy: {
            startDate: 'asc',
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
  }

  async tableSize(): Promise<number> {
    return this.prisma.employee.count()
  }

  async createEmployee(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    this.logger.log('An employees is created', { data })
    return this.prisma.employee.create({ data })
  }

  async updateEmployee(params: { employeeId: string; data: Prisma.EmployeeUpdateInput }): Promise<Employee> {
    const { employeeId, data } = params
    this.logger.log('An employees is updated', { employeeId, data })
    return this.prisma.employee.update({
      data,
      where: {
        id: employeeId,
      },
    })
  }

  fetchLatestDateRangeForEmployee(employeeId: string) {
    this.logger.log('Latest date range for employee is fetched', {
      employeeId,
    })
    return this.prisma.dateRange.findFirst({
      where: {
        type: 'employment',
        employee: {
          id: employeeId,
        },
      },
      orderBy: [
        {
          startDate: 'desc',
        },
      ],
    })
  }

  async unemployEmployee(employeeId: string): Promise<Employee> {
    const latestDateRange = await this.fetchLatestDateRangeForEmployee(employeeId)

    if (latestDateRange.endDate === null) {
      this.logger.log('An employee is unemployed', { employeeId })

      return this.prisma.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          isActive: false,
          activeInCompany: {
            update: {
              where: {
                id: latestDateRange.id,
              },
              data: {
                endDate: new Date().toISOString(),
              },
            },
          },
        },
      })
    }
  }

  async reemployEmployee(employeeId: string): Promise<Employee> {
    const latestDateRange = await this.fetchLatestDateRangeForEmployee(employeeId)

    if (latestDateRange.startDate && latestDateRange.endDate) {
      this.logger.log('An employees is reemployed', { employeeId })

      return this.prisma.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          isActive: true,
          activeInCompany: {
            create: {
              startDate: new Date().toISOString(),
              type: 'employment',
            },
          },
        },
      })
    }
  }

  async getAverageSalaryStatistic(departmentId?: string): Promise<number> {
    this.logger.log('Average salary for all employees has been called', {
      departmentId,
    })

    return this.prisma.employee
      .aggregate({
        _avg: {
          salary: true,
        },
        where: {
          departmentId: departmentId,
        },
      })
      .then((aggregate) => aggregate._avg.salary)
  }

  async getEmploymentChangeStatistic(departmentId?: string, dateTo: Date = new Date(), dateFrom: Date = new Date(0)) {
    this.logger.log('Employment Stats for all employees has been called', {
      departmentId,
      dateTo,
      dateFrom,
    })

    return this.prisma.dateRange.findMany({
      where: {
        type: 'employment',
        employee: {
          department: {
            id: departmentId,
          },
        },
        OR: [
          {
            endDate: {
              gte: dateFrom,
              lte: dateTo,
            },
          },
          {
            startDate: {
              gte: dateFrom,
              lte: dateTo,
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
  }
}
