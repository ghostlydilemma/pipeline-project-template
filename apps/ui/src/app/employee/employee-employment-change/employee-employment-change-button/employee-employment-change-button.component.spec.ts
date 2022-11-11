import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DateRangeDto, DepartmentDto, EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MockProxy, mock } from 'jest-mock-extended'

import { AppComponent } from '../../../app.component'
import { EmployeeEmploymentChangeButtonComponent } from './employee-employment-change-button.component'
import { EmployeeEmploymentChangeDialogComponent } from '../employee-employment-change-dialog/employee-employment-change-dialog.component'
import { EmployeeService } from '../../service/employee.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'

describe('EmployeeReemployButtonComponent', () => {
  let component: EmployeeEmploymentChangeButtonComponent
  let fixture: ComponentFixture<EmployeeEmploymentChangeButtonComponent>
  let employeeService: MockProxy<EmployeeService>
  let windowSpy: jest.SpyInstance<Window, []>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeEmploymentChangeButtonComponent, AppComponent],
      providers: [
        {
          provide: EmployeeService,
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
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeEmploymentChangeButtonComponent)
    component = fixture.componentInstance
    component.employee = {
      id: '1',
      firstname: 'Denisse',
      middlename: 'Donald',
      lastname: 'Cobb',
      address: '2883 Ashton Lane, Austin, TX, 78701',
      dateOfBirth: new Date(2022, 10, 10),
      salary: 1865,
      isActive: true,
      activeInCompany: [{}] as DateRangeDto[],
      department: {} as DepartmentDto,
    }
    fixture.detectChanges()

    employeeService = TestBed.inject(EmployeeService) as MockProxy<EmployeeService>
    windowSpy = jest.spyOn(window, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  it.each`
    isActive | action
    ${true}  | ${'unemploy'}
    ${false} | ${'reemploy'}
  `('returns $action when employee is active: $isActive', ({ isActive, action }) => {
    component.employee.isActive = isActive
    component.ngOnInit()
    expect(component.action).toBe(action)
  })

  describe('Employee status change button', () => {
    it('opens the unemploy dialog and handles unemployment dialog action', () => {
      component.action = 'unemploy'
      windowSpy.mockImplementation(
        () =>
          ({
            location: {
              reload: () => mock(),
            },
          } as unknown as Window)
      )
      jest.spyOn(component.dialog, 'open').mockReturnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<EmployeeEmploymentChangeDialogComponent>)
      const expectedEmployee: EmployeeDto = {
        id: '1',
        isActive: true,
      } as EmployeeDto
      employeeService.unemployEmployee.mockReturnValue(of(expectedEmployee))

      component.changeEmployment()

      expect(component.dialog.open).toHaveBeenCalledWith(EmployeeEmploymentChangeDialogComponent, {
        width: '300px',
        data: {
          action: 'unemploy',
          employeeName: 'Denisse Donald Cobb',
        },
      })
      expect(employeeService.unemployEmployee).toHaveBeenCalledWith(expectedEmployee.id)
    })

    it('opens the unemploy dialog and handles unemployment dialog action', () => {
      component.action = 'reemploy'
      windowSpy.mockImplementation(
        () =>
          ({
            location: {
              reload: () => mock(),
            },
          } as unknown as Window)
      )
      jest.spyOn(component.dialog, 'open').mockReturnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<EmployeeEmploymentChangeDialogComponent>)
      const expectedEmployee: EmployeeDto = {
        id: '1',
        isActive: false,
      } as EmployeeDto
      employeeService.reemployEmployee.mockReturnValue(of(expectedEmployee))

      component.changeEmployment()

      expect(component.dialog.open).toHaveBeenCalledWith(EmployeeEmploymentChangeDialogComponent, {
        width: '300px',
        data: {
          action: 'reemploy',
          employeeName: 'Denisse Donald Cobb',
        },
      })
      expect(employeeService.reemployEmployee).toHaveBeenCalledWith(expectedEmployee.id)
    })
  })
})
