import { Component, Inject, OnInit } from '@angular/core'
import { DepartmentDto, EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { DepartmentService } from '../../../department/service/department.service'
import { EmploymentManagementType } from '../employment-management-type'

type EmploymentManagementDialogData = {
  action: EmploymentManagementType
  employee?: EmployeeDto
}

@Component({
  selector: 'pipeline-project-template-employee-dialog',
  templateUrl: './employee-management-dialog.component.html',
  styleUrls: ['./employee-management-dialog.component.scss'],
})
export class EmployeeManagementDialogComponent implements OnInit {
  departments: DepartmentDto[]
  employeeForm: FormGroup
  namePattern = /^[A-Za-z\xC0-\xFF][A-Za-z\xC0-\xFF'-]+([ A-Za-z\xC0-\xFF][A-Za-z\xC0-\xFF'-]+)*$/u

  constructor(
    public dialogRef: MatDialogRef<EmployeeManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmploymentManagementDialogData,
    private readonly departmentService: DepartmentService
  ) {}

  closeDialog() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe((departments) => (this.departments = departments))

    this.employeeForm = new FormGroup({
      firstname: new FormControl(this.data.employee?.firstname, [
        Validators.required,
        Validators.pattern(this.namePattern),
      ]),
      middlename: new FormControl(this.data.employee?.middlename, [Validators.pattern(this.namePattern)]),
      lastname: new FormControl(this.data.employee?.lastname, [
        Validators.required,
        Validators.pattern(this.namePattern),
      ]),
      address: new FormControl(this.data.employee?.address, [Validators.required]),
      dateOfBirth: new FormControl(this.data.employee?.dateOfBirth, [Validators.required]),
      salary: new FormControl(this.data.employee?.salary, [Validators.min(0), Validators.required]),
      department: new FormControl(this.data.employee?.department.id, [Validators.required]),
    })
  }

  get firstname() {
    return this.employeeForm.get('firstname')
  }

  get middlename() {
    return this.employeeForm.get('middlename')
  }

  get lastname() {
    return this.employeeForm.get('lastname')
  }

  get address() {
    return this.employeeForm.get('address')
  }

  get dateOfBirth() {
    return this.employeeForm.get('dateOfBirth')
  }

  get salary() {
    return this.employeeForm.get('salary')
  }

  saveDialog() {
    if (this.employeeForm.valid && this.employeeForm.dirty && this.employeeForm.touched) {
      this.dialogRef.close(this.employeeForm.value)
    }
  }
}
