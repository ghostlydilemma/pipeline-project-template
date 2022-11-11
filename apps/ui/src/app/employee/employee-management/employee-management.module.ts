import { BemModule } from 'angular-bem'
import { CommonModule } from '@angular/common'
import { EmployeeManagementButtonComponent } from './employee-management-button/employee-management-button.component'
import { EmployeeManagementDialogComponent } from './employee-management-dialog/employee-management-dialog.component'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [EmployeeManagementDialogComponent, EmployeeManagementButtonComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BemModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  exports: [EmployeeManagementDialogComponent, EmployeeManagementButtonComponent],
})
export class EmployeeManagementModule {}
