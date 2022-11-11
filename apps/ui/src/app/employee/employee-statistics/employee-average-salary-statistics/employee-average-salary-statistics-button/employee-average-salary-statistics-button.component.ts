import { Component } from '@angular/core'
import { EmployeeAverageSalaryStatisticsDialogComponent } from '../employee-average-salary-statistics-dialog/employee-average-salary-statistics-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'pipeline-project-template-employee-average-salary-statistics-button',
  templateUrl: './employee-average-salary-statistics-button.component.html',
})
export class EmployeeAverageSalaryStatisticsButtonComponent {
  constructor(public dialog: MatDialog) {}

  openAverageSalaryDialog() {
    this.dialog.open(EmployeeAverageSalaryStatisticsDialogComponent, {
      width: '450px',
    })
  }
}
