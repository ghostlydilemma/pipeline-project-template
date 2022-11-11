import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockProxy, mock } from 'jest-mock-extended'

import { EmployeeDetailComponent } from './employee-detail.component'
import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeService } from '../service/employee.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent
  let fixture: ComponentFixture<EmployeeDetailComponent>
  let employeeService: MockProxy<EmployeeService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ employeeId: '1' })),
          },
        },
        {
          provide: EmployeeService,
          useFactory: () => mock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    employeeService = TestBed.inject(EmployeeService) as MockProxy<EmployeeService>
  })

  describe('Create employee detail view', () => {
    it('should fetch the requested employee', () => {
      jest.spyOn(console, 'warn')
      const expectedEmployee: EmployeeDto = {
        id: '1',
      } as EmployeeDto

      employeeService.getEmployeeById.mockReturnValue(of(expectedEmployee))

      component.ngOnInit()

      expect(employeeService.getEmployeeById).toHaveBeenCalledWith('1')
      expect(component.employee).toBe(expectedEmployee)
      expect(console.warn).not.toHaveBeenCalled()
    })

    it('no employee should be fetched', () => {
      jest.spyOn(console, 'warn')

      employeeService.getEmployeeById.mockReturnValue(of(undefined as unknown as EmployeeDto))

      component.ngOnInit()

      expect(employeeService.getEmployeeById).toHaveBeenCalledWith('1')
      expect(component.employee).toBe(undefined)
      expect(console.warn).toHaveBeenCalled()
    })
  })
})
