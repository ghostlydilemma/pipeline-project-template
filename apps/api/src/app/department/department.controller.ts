import { Controller, Get, Logger } from '@nestjs/common'

import { Department } from '@prisma/client'
import { DepartmentService } from './department.service'

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService, private readonly logger: Logger) {}

  @Get()
  getAllDepartments(): Promise<Department[]> {
    this.logger.log('The departments are fetched')
    return this.departmentService.getAllDepartments()
  }
}
