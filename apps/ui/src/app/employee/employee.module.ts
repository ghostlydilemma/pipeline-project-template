import { BemModule } from 'angular-bem'
import { CommonModule } from '@angular/common'
import { EmployeeAbsenceOverviewComponent } from './employee-absence-overview/employee-absence-overview.component'
import { EmployeeActivityStatusComponent } from './employee-activity-status/employee-activity-status.component'
import { EmployeeAverageSalaryStatisticsModule } from './employee-statistics/employee-average-salary-statistics/employee-average-salary-statistics.module'
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component'
import { EmployeeEmploymentChangeModule } from './employee-employment-change/employee-employment-change.module'
import { EmployeeEmploymentStatisticsModule } from './employee-statistics/employee-employment-statistics/employee-employment-statistics.module'
import { EmployeeManagementModule } from './employee-management/employee-management.module'
import { EmployeeOverviewComponent } from './employee-overview/employee-overview.component'
import { EmployeeOverviewToolbarComponent } from './employee-overview-toolbar/employee-overview-toolbar.component'
import { EmployeeRoutingModule } from './employee-routing.module'
import { EmployeeStatisticsModule } from './employee-statistics/employee-statistics.module'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [
    EmployeeOverviewComponent,
    EmployeeDetailComponent,
    EmployeeActivityStatusComponent,
    EmployeeOverviewToolbarComponent,
    EmployeeAbsenceOverviewComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    BemModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    EmployeeManagementModule,
    EmployeeEmploymentChangeModule,
    MatCardModule,
    EmployeeStatisticsModule,
    EmployeeAverageSalaryStatisticsModule,
    EmployeeEmploymentStatisticsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  exports: [EmployeeOverviewComponent],
})
export class EmployeeModule {}
