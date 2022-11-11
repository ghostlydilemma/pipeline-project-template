import { Body, Controller, Get, Logger, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common'
import { CreateEmployeeDto, PaginatedListDto, UpdateEmployeeDto } from '@pipeline-project-template/api-interfaces'

import { Employee as EmployeeModel } from '@prisma/client'
import { EmployeeService } from './employee.service'
import { PaginationService } from '../pagination/pagination.service'

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly paginationService: PaginationService,
    private readonly logger: Logger
  ) {}

  @Get(':id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(id)
  }

  @Get()
  async getAllEmployees(
    @Query('limit', ParseIntPipe) limit = 50,
    @Query('offset', ParseIntPipe) offset = 0
  ): Promise<PaginatedListDto<EmployeeModel>> {
    return this.employeeService
      .getAllEmployees({
        limit,
        offset,
      })
      .then(async (employees) =>
        this.paginationService.createPagination(employees, {
          offset,
          limit,
          totalItems: await this.employeeService.tableSize(),
        })
      )
  }

  @Post()
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeModel> {
    const { department } = createEmployeeDto

    return this.employeeService.createEmployee({
      ...createEmployeeDto,
      department: {
        connect: {
          id: department,
        },
      },
      isActive: true,
      activeInCompany: {
        create: {
          startDate: new Date().toISOString(),
          type: 'employment',
        },
      },
    })
  }

  @Put(':id')
  updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    let department

    if (updateEmployeeDto.department) {
      department = {
        connect: {
          id: updateEmployeeDto.department,
        },
      }
    }

    return this.employeeService.updateEmployee({
      employeeId: id,
      data: {
        ...updateEmployeeDto,
        department,
      },
    })
  }

  @Patch(':id/unemploy')
  unemployEmployee(@Param('id') id: string) {
    this.logger.log('An employee is unemployed', { id })
    return this.employeeService.unemployEmployee(id)
  }

  @Patch(':id/reemploy')
  reemployEmployee(@Param('id') id: string) {
    this.logger.log('An employee is reemployed', { id })
    return this.employeeService.reemployEmployee(id)
  }

  @Get('stats/salary')
  getAverageSalaryStatistic(@Query('department') departmentId?: string) {
    this.logger.log('Average Salary has been calculated', { departmentId })
    return this.employeeService.getAverageSalaryStatistic(departmentId)
  }

  @Get('stats/employment')
  getEmploymentChangeStatistic(
    @Query('department') departmentId?: string,
    @Query('dateTo') dateTo?: string,
    @Query('dateFrom') dateFrom?: string
  ) {
    this.logger.log('Employment Stats have been gathered', {
      departmentId,
      dateTo,
      dateFrom,
    })

    return this.employeeService.getEmploymentChangeStatistic(
      departmentId,
      new Date(dateTo ?? Date.now()),
      new Date(dateFrom ?? null)
    )
  }
}
