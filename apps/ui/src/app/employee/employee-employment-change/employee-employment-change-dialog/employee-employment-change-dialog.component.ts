import { Component, Inject } from '@angular/core'

import { EmploymentChangeType } from '../employment-change-type'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

type EmploymentChangeDialogData = {
  action: EmploymentChangeType
  employeeName: string
}

@Component({
  selector: 'pipeline-project-template-employee-employment-change-dialog',
  templateUrl: './employee-employment-change-dialog.component.html',
  styleUrls: ['./employee-employment-change-dialog.component.scss'],
})
export class EmployeeEmploymentChangeDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: EmploymentChangeDialogData) {
    this.data = data
  }
}
