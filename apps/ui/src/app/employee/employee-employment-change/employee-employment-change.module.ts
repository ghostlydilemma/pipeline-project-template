import { CommonModule } from '@angular/common'
import { EmployeeEmploymentChangeButtonComponent } from './employee-employment-change-button/employee-employment-change-button.component'
import { EmployeeEmploymentChangeDialogComponent } from './employee-employment-change-dialog/employee-employment-change-dialog.component'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [EmployeeEmploymentChangeButtonComponent, EmployeeEmploymentChangeDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [EmployeeEmploymentChangeButtonComponent],
})
export class EmployeeEmploymentChangeModule {}
