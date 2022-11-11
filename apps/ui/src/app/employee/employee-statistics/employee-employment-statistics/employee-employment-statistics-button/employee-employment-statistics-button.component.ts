import { Component } from '@angular/core'
import { EmployeeEmploymentStatisticsDialogComponent } from '../employee-employment-statistics-dialog/employee-employment-statistics-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'pipeline-project-template-employee-employment-statistics-button',
  templateUrl: './employee-employment-statistics-button.component.html',
})
export class EmployeeEmploymentStatisticsButtonComponent {
  constructor(public dialog: MatDialog) {}

  openAverageSalaryDialog() {
    this.dialog.open(EmployeeEmploymentStatisticsDialogComponent, {
      width: '800px',
    })
  }
}
