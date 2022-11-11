import { BemModule } from 'angular-bem'
import { CommonModule } from '@angular/common'
import { EmployeeAverageSalaryStatisticsButtonComponent } from './employee-average-salary-statistics-button/employee-average-salary-statistics-button.component'
import { EmployeeAverageSalaryStatisticsDialogComponent } from './employee-average-salary-statistics-dialog/employee-average-salary-statistics-dialog.component'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [EmployeeAverageSalaryStatisticsButtonComponent, EmployeeAverageSalaryStatisticsDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatSelectModule, BemModule],
  exports: [EmployeeAverageSalaryStatisticsButtonComponent],
})
export class EmployeeAverageSalaryStatisticsModule {}
