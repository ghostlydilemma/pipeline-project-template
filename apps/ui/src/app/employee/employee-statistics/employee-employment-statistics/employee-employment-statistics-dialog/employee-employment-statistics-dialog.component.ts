import { BehaviorSubject, Subject, combineLatest, switchMap } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

import { DepartmentDto } from '@pipeline-project-template/api-interfaces'
import { DepartmentService } from '../../../../department/service/department.service'
import { EmployeeService } from '../../../service/employee.service'
import { SortedEmploymentStats } from '../../../date-range-helper-types'

@Component({
  selector: 'pipeline-project-template-employee-employment-statistics-dialog',
  templateUrl: './employee-employment-statistics-dialog.component.html',
  styleUrls: ['./employee-employment-statistics-dialog.component.scss'],
})
@UntilDestroy()
export class EmployeeEmploymentStatisticsDialogComponent implements OnInit {
  salary: string
  departments: DepartmentDto[]
  departmentId$: Subject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)
  dateFrom$: Subject<Date | undefined> = new BehaviorSubject<Date | undefined>(undefined)
  dateTo$: Subject<Date | undefined> = new BehaviorSubject<Date | undefined>(undefined)
  employmentStats: SortedEmploymentStats
  isLoadingResults = true

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.getDepartments()

    this.getEmploymentStats()
  }

  getDepartments() {
    this.departmentService.getAllDepartments().subscribe((departments) => (this.departments = departments))
  }

  getEmploymentStats() {
    combineLatest([this.departmentId$, this.dateFrom$, this.dateTo$])
      .pipe(
        untilDestroyed(this),
        switchMap(([departmentId, dateFrom, dateTo]) => {
          this.isLoadingResults = true
          return this.employeeService.getEmploymentChangeStatistic(departmentId, {
            startDate: dateFrom,
            endDate: dateTo,
          })
        })
      )
      .subscribe((employmentStats) => {
        this.isLoadingResults = false
        this.employmentStats = employmentStats
      })
  }
}
