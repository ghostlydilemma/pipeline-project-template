import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { DepartmentDto } from '@pipeline-project-template/api-interfaces'
import { DepartmentHttpService } from './department-http.service'
import { TestBed } from '@angular/core/testing'
import { firstValueFrom } from 'rxjs'

describe('DepartmentHttpService', () => {
  let service: DepartmentHttpService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    })
    service = TestBed.inject(DepartmentHttpService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('fetch average salary for all employees of the company', () => {
    const expectedUrl = 'http://localhost:3000/api/department'
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

    const departments = firstValueFrom(service.getAllDepartments())

    const req = httpTestingController.expectOne(expectedUrl)
    req.flush(expectedDepartments)

    expect(req.request.method).toBe('GET')
    expect(departments).resolves.toBe(expectedDepartments)
  })
})
