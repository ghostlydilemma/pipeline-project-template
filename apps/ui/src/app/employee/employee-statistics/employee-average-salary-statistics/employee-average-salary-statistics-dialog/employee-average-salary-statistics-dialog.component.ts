import { BehaviorSubject, Subject, startWith, switchMap } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

import { DepartmentDto } from '@pipeline-project-template/api-interfaces'
import { DepartmentService } from '../../../../department/service/department.service'
import { EmployeeService } from '../../../service/employee.service'

@Component({
  selector: 'pipeline-project-template-employee-average-salary-statistics-dialog',
  templateUrl: './employee-average-salary-statistics-dialog.component.html',
  styleUrls: ['./employee-average-salary-statistics-dialog.component.scss'],
})
@UntilDestroy()
export class EmployeeAverageSalaryStatisticsDialogComponent implements OnInit {
  salary: string
  departments: DepartmentDto[]
  departmentId$: Subject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.getDepartments()

    this.getAverageSalary()
  }

  private getDepartments() {
    this.departmentService.getAllDepartments().subscribe((departments) => (this.departments = departments))
  }

  private getAverageSalary() {
    this.departmentId$
      .pipe(
        startWith(undefined),
        untilDestroyed(this),
        switchMap((departmentId) => {
          return this.employeeService.getAverageSalaryStatistic(departmentId)
        })
      )
      .subscribe((salary) => {
        this.salary = salary.toFixed(2)
      })
  }
}
