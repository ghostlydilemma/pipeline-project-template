import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DepartmentModule } from './department/department.module'
import { EmployeeModule } from './employee/employee.module'
import { Module } from '@nestjs/common'
import { PaginationModule } from './pagination/pagination.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [EmployeeModule, PaginationModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
