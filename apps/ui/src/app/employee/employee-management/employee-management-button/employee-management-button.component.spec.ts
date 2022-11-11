import { ActivatedRoute, Router } from '@angular/router'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MockProxy, mock } from 'jest-mock-extended'

import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeEmploymentChangeDialogComponent } from '../../employee-employment-change/employee-employment-change-dialog/employee-employment-change-dialog.component'
import { EmployeeManagementButtonComponent } from './employee-management-button.component'
import { EmployeeService } from '../../service/employee.service'
import { of } from 'rxjs'

describe('EmployeeManagementButtonComponent', () => {
  let component: EmployeeManagementButtonComponent
  let fixture: ComponentFixture<EmployeeManagementButtonComponent>
  let windowSpy: jest.SpyInstance<Window, []>
  let employeeService: MockProxy<EmployeeService>
  let router: MockProxy<Router>
  let route: MockProxy<ActivatedRoute>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeManagementButtonComponent],
      providers: [
        {
          provide: EmployeeService,
          useFactory: () => mock(),
        },
        {
          provide: Router,
          useFactory: () => mock(),
        },
        {
          provide: ActivatedRoute,
          useFactory: () => mock(),
        },
        {
          provide: MatDialog,
          useFactory: () => mock(),
        },
        {
          provide: window,
          useFactory: () => mock(),
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeManagementButtonComponent)
    component = fixture.componentInstance
    employeeService = TestBed.inject(EmployeeService) as MockProxy<EmployeeService>
    router = TestBed.inject(Router) as MockProxy<Router>
    route = TestBed.inject(ActivatedRoute) as MockProxy<ActivatedRoute>
    fixture.detectChanges()
    windowSpy = jest.spyOn(window, 'window', 'get')
    jest.spyOn(component.dialog, 'open').mockReturnValue({
      afterClosed: () =>
        of({
          firstname: 'First name',
        }),
    } as MatDialogRef<EmployeeEmploymentChangeDialogComponent>)
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  describe('Employee Management Button', () => {
    it('should open in opened in create mode', () => {
      component.employmentChangeType = 'create'
      fixture.detectChanges()
      employeeService.createEmployee.mockReturnValue(
        of({
          id: '1',
        } as EmployeeDto)
      )

      component.openManageEmployeeDialog()

      expect(employeeService.createEmployee).toHaveBeenCalledWith({
        firstname: 'First name',
      })
      expect(router.navigate).toHaveBeenCalledWith(['./', '1'], {
        relativeTo: route,
      })
    })

    it('should open in opened in edit mode', () => {
      windowSpy.mockImplementation(
        () =>
          ({
            location: {
              reload: () => mock(),
            },
          } as unknown as Window)
      )
      component.employmentChangeType = 'edit'
      component.employee = {
        id: '1',
        firstname: 'Former name',
      } as EmployeeDto
      fixture.detectChanges()
      employeeService.updateEmployee.mockReturnValue(
        of({
          id: '1',
        } as EmployeeDto)
      )

      component.openManageEmployeeDialog()

      expect(employeeService.updateEmployee).toHaveBeenCalledWith('1', {
        firstname: 'First name',
      })
    })
  })
})
