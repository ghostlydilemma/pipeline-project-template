import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  async getAllDepartments() {
    this.logger.log('All departments are fetched')
    return this.prisma.department.findMany()
  }
}
