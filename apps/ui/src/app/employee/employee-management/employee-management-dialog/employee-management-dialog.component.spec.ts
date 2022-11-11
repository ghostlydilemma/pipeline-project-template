import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MockProxy, mock } from 'jest-mock-extended'

import { DepartmentService } from '../../../department/service/department.service'
import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeManagementDialogComponent } from './employee-management-dialog.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'

const DEPARTMENTS = [{ id: '1', name: 'Test 1' }]

describe('EmployeeDialogComponent as Create Dialog', () => {
  let component: EmployeeManagementDialogComponent
  let departmentService: MockProxy<DepartmentService>
  let fixture: ComponentFixture<EmployeeManagementDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeManagementDialogComponent],
      providers: [
        {
          provide: DepartmentService,
          useFactory: () => mock(),
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeManagementDialogComponent)
    component = fixture.componentInstance

    departmentService = TestBed.inject(DepartmentService) as MockProxy<DepartmentService>
    departmentService.getAllDepartments.mockReturnValue(of(DEPARTMENTS))

    fixture.detectChanges()
  })

  it('should fetch all departments', () => {
    const departments = [{ id: '1', name: 'HR' }]
    departmentService.getAllDepartments.mockReturnValue(of(departments))

    component.ngOnInit()

    expect(component.departments).toBe(departments)
  })

  it('setup the employee form with no input (create mode)', () => {
    const departments = [{ id: '1', name: 'HR' }]
    departmentService.getAllDepartments.mockReturnValue(of(departments))

    component.ngOnInit()

    expect(component.employeeForm.controls['firstname'].value).toBe(null)
    expect(component.employeeForm.controls['middlename'].value).toBe(null)
    expect(component.employeeForm.controls['lastname'].value).toBe(null)
    expect(component.employeeForm.controls['address'].value).toBe(null)
    expect(component.employeeForm.controls['dateOfBirth'].value).toBe(null)
    expect(component.employeeForm.controls['salary'].value).toBe(null)
    expect(component.employeeForm.controls['department'].value).toBe(null)
  })
})

describe('EmployeeDialogComponent as Edit Dialog', () => {
  let component: EmployeeManagementDialogComponent
  let departmentService: MockProxy<DepartmentService>
  let fixture: ComponentFixture<EmployeeManagementDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeManagementDialogComponent],
      providers: [
        {
          provide: DepartmentService,
          useFactory: () => mock(),
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            employee: {
              id: '123',
              firstname: 'First Name',
              middlename: 'Middle Name',
              lastname: 'Last Name',
              address: 'Address',
              salary: 1000,
              department: {
                id: '1',
                name: 'Testing',
              },
              isActive: true,
              activeInCompany: [{}],
              dateOfBirth: new Date(2022, 10, 10),
            } as EmployeeDto,
          },
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(EmployeeManagementDialogComponent)
    component = fixture.componentInstance

    departmentService = TestBed.inject(DepartmentService) as MockProxy<DepartmentService>
    departmentService.getAllDepartments.mockReturnValue(of(DEPARTMENTS))

    fixture.detectChanges()
  })

  it('should fetch all departments', () => {
    const departments = [{ id: '1', name: 'HR' }]
    departmentService.getAllDepartments.mockReturnValue(of(departments))

    component.ngOnInit()

    expect(component.departments).toBe(departments)
  })

  it('setup the employee form with input (edit mode)', () => {
    const departments = [{ id: '1', name: 'HR' }]
    departmentService.getAllDepartments.mockReturnValue(of(departments))

    component.ngOnInit()

    expect(component.employeeForm.controls['firstname'].value).toBe('First Name')
    expect(component.employeeForm.controls['middlename'].value).toBe('Middle Name')
    expect(component.employeeForm.controls['lastname'].value).toBe('Last Name')
    expect(component.employeeForm.controls['address'].value).toBe('Address')
    expect(component.employeeForm.controls['dateOfBirth'].value).toStrictEqual(new Date(2022, 10, 10))
    expect(component.employeeForm.controls['salary'].value).toBe(1000)
    expect(component.employeeForm.controls['department'].value).toBe('1')
  })
})
