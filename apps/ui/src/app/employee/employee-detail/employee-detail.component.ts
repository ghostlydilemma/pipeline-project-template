import { Component, OnInit } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { map, switchMap } from 'rxjs'

import { ActivatedRoute } from '@angular/router'
import { EMPLOYEE_QUERY_ID } from '@pipeline-project-template/api-interfaces'
import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeService } from '../service/employee.service'
import { emptyIfNull } from '../../common/empty-if-null'

@Component({
  selector: 'pipeline-project-template-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
@UntilDestroy()
export class EmployeeDetailComponent implements OnInit {
  employee: EmployeeDto

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get(EMPLOYEE_QUERY_ID)),
        emptyIfNull(),
        untilDestroyed(this),
        switchMap((employeeId) => {
          return this.employeeService.getEmployeeById(employeeId)
        })
      )
      .subscribe((employee) => {
        if (!employee) {
          console.warn('Employee not found')
        }
        this.employee = employee
      })
  }
}
