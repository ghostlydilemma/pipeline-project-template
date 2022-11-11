import { ActivatedRoute, Router } from '@angular/router'
import { Component, Input } from '@angular/core'

import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeManagementDialogComponent } from '../employee-management-dialog/employee-management-dialog.component'
import { EmployeeService } from '../../service/employee.service'
import { EmploymentManagementType } from '../employment-management-type'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'pipeline-project-template-employee-management-button',
  templateUrl: './employee-management-button.component.html',
})
export class EmployeeManagementButtonComponent {
  @Input() employmentChangeType: EmploymentManagementType
  @Input() employee: EmployeeDto | undefined = undefined

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  openManageEmployeeDialog() {
    const dialogRef = this.dialog.open(EmployeeManagementDialogComponent, {
      width: '600px',
      data: { action: this.employmentChangeType, employee: this.employee },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (this.employmentChangeType) {
          case 'create':
            return this.employeeService.createEmployee(result).subscribe((employee) =>
              this.router.navigate(['./', employee.id], {
                relativeTo: this.route,
              })
            )
          case 'edit':
            if (this.employee) {
              return this.employeeService
                .updateEmployee(this.employee.id, result)
                .subscribe(() => window.location.reload())
            }
            return
          default:
            throw Error('This action is not supported')
        }
      }
      return
    })
  }
}
