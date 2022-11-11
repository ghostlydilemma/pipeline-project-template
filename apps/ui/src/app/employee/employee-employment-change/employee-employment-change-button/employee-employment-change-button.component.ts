import { Component, Input, OnInit } from '@angular/core'

import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeEmploymentChangeDialogComponent } from '../employee-employment-change-dialog/employee-employment-change-dialog.component'
import { EmployeeService } from '../../service/employee.service'
import { EmploymentChangeType } from '../employment-change-type'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'pipeline-project-template-employee-employment-change-button',
  templateUrl: './employee-employment-change-button.component.html',
})
export class EmployeeEmploymentChangeButtonComponent implements OnInit {
  @Input() employee: EmployeeDto
  action: EmploymentChangeType

  constructor(public dialog: MatDialog, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.action = this.employee.isActive ? 'unemploy' : 'reemploy'
  }

  changeEmployment(): void {
    const dialogRef = this.dialog.open(EmployeeEmploymentChangeDialogComponent, {
      width: '300px',
      data: {
        action: this.action,
        employeeName: `${this.employee.firstname} ${this.employee.middlename} ${this.employee.lastname}`,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.employee) {
        switch (this.action) {
          case 'reemploy':
            return this.employeeService.reemployEmployee(this.employee.id).subscribe(() => window.location.reload())
          case 'unemploy':
            return this.employeeService.unemployEmployee(this.employee.id).subscribe(() => window.location.reload())
          default:
            throw Error('This action is not supported')
        }
      }
      return
    })
  }
}
