import { Logger, Module } from '@nestjs/common'

import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [],
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService, Logger],
})
export class DepartmentModule {}
