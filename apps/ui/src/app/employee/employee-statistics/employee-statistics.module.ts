import { CommonModule } from '@angular/common'
import { EmployeeAverageSalaryStatisticsModule } from './employee-average-salary-statistics/employee-average-salary-statistics.module'
import { EmployeeEmploymentStatisticsModule } from './employee-employment-statistics/employee-employment-statistics.module'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [],
  imports: [CommonModule, EmployeeAverageSalaryStatisticsModule, EmployeeEmploymentStatisticsModule],
})
export class EmployeeStatisticsModule {}
