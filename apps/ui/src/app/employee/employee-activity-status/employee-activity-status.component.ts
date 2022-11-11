import { Component, Input } from '@angular/core'

import { DateRangeDto } from '@pipeline-project-template/api-interfaces'

@Component({
  selector: 'pipeline-project-template-employee-activity-status',
  templateUrl: './employee-activity-status.component.html',
  styleUrls: ['./employee-activity-status.component.scss'],
})
export class EmployeeActivityStatusComponent {
  @Input() status = false
  @Input() activeInCompany: DateRangeDto[] = []
  @Input() inline = false

  getLastThreeArrayValues(array: DateRangeDto[]) {
    return array.slice(Math.max(array.length - 3, 0))
  }
}
