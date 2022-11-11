import { MockProxy, mock } from 'jest-mock-extended'
import { firstValueFrom, of } from 'rxjs'

import { DepartmentDto } from '@pipeline-project-template/api-interfaces'
import { DepartmentHttpService } from './department-http.service'
import { DepartmentService } from './department.service'
import { TestBed } from '@angular/core/testing'

describe('DepartmentService', () => {
  let service: DepartmentService
  let departmentHttpService: MockProxy<DepartmentHttpService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DepartmentHttpService, useFactory: () => mock() }],
    })

    service = TestBed.inject(DepartmentService)
    departmentHttpService = TestBed.inject(DepartmentHttpService) as MockProxy<DepartmentHttpService>
  })

  it('fetch average salary for all employees of the company', () => {
    const expectedDepartments: DepartmentDto[] = [
      {
        id: '1',
        name: 'Department 1',
      },
      {
        id: '2',
        name: 'Department 2',
      },
    ]
    departmentHttpService.getAllDepartments.mockReturnValue(of(expectedDepartments))

    const departments = firstValueFrom(service.getAllDepartments())

    expect(departmentHttpService.getAllDepartments).toHaveBeenCalledWith()
    return expect(departments).resolves.toBe(expectedDepartments)
  })
})
