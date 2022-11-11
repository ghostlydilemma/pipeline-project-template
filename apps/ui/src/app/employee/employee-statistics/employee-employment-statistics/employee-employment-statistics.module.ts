import { BemModule } from 'angular-bem'
import { CommonModule } from '@angular/common'
import { EmployeeEmploymentStatisticsButtonComponent } from './employee-employment-statistics-button/employee-employment-statistics-button.component'
import { EmployeeEmploymentStatisticsDialogComponent } from './employee-employment-statistics-dialog/employee-employment-statistics-dialog.component'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [EmployeeEmploymentStatisticsButtonComponent, EmployeeEmploymentStatisticsDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    BemModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [EmployeeEmploymentStatisticsButtonComponent],
})
export class EmployeeEmploymentStatisticsModule {}
