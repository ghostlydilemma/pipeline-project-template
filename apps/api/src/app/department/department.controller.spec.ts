import { MockProxy, mock } from 'jest-mock-extended'
import { Test, TestingModule } from '@nestjs/testing'

import { Department } from '@prisma/client'
import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'
import { Logger } from '@nestjs/common'

describe('DepartmentController', () => {
  let controller: DepartmentController
  let logger: MockProxy<Logger>
  let service: MockProxy<DepartmentService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useFactory: () => mock(),
        },
        { provide: Logger, useFactory: () => mock() },
      ],
    }).compile()

    controller = module.get(DepartmentController)
    logger = module.get(Logger)
    service = module.get(DepartmentService)
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

    service.getAllDepartments.mockResolvedValue(expectedDepartment)

    controller.getAllDepartments()

    expect(service.getAllDepartments).toHaveBeenCalledWith()
    expect(logger.log).toHaveBeenCalledWith('The departments are fetched')
  })
})
