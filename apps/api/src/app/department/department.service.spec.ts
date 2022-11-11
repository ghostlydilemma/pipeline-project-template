import { DeepMockProxy, MockProxy, mock, mockDeep } from 'jest-mock-extended'
import { Department, PrismaClient } from '@prisma/client'
import { Test, TestingModule } from '@nestjs/testing'

import { DepartmentService } from './department.service'
import { Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

describe('DepartmentService', () => {
  let service: DepartmentService
  let logger: MockProxy<Logger>
  let prisma: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentService, PrismaService, { provide: Logger, useFactory: () => mock() }],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile()

    service = module.get(DepartmentService)
    logger = module.get(Logger)
    prisma = module.get(PrismaService)
  })

  it('should get all departments', () => {
    const expectedDepartment: Department[] = [
      {
        id: '1',
        name: 'Department 1',
      },
      {
        id: '2',
        name: 'Department 2',
      },
    ]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.department.findMany.mockResolvedValue(expectedDepartment)

    service.getAllDepartments()

    expect(prisma.department.findMany).toHaveBeenCalledWith()
    expect(logger.log).toHaveBeenCalledWith('All departments are fetched')
  })
})
