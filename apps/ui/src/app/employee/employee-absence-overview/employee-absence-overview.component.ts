import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'
import { DateRangeDto, PaginationQueryDto } from '@pipeline-project-template/api-interfaces'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { catchError, of as observableOf, startWith, switchMap } from 'rxjs'

import { EmployeeAbsenceService } from '../service/employee-absence.service'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'pipeline-project-template-employee-absence-overview',
  templateUrl: './employee-absence-overview.component.html',
  styleUrls: ['./employee-absence-overview.component.scss'],
})
@UntilDestroy()
export class EmployeeAbsenceOverviewComponent implements AfterViewInit {
  @Input() employeeId: string

  displayedColumns: string[] = ['startDate', 'endDate', 'type']
  data: DateRangeDto[] = []

  pageSize = 8
  resultsLength = 0
  isLoadingResults = true

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private absenceService: EmployeeAbsenceService) {}

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        untilDestroyed(this),
        switchMap(() => {
          this.isLoadingResults = true
          const paginationOptions: PaginationQueryDto = {
            offset: this.pageSize * this.paginator.pageIndex,
            limit: this.pageSize,
          }

          return this.absenceService
            .getAbsencesByEmployeeId(this.employeeId, paginationOptions)
            .pipe(catchError(() => observableOf(null)))
        })
      )
      .subscribe((data) => {
        this.isLoadingResults = false

        if (data) {
          this.resultsLength = data.meta.totalItems
          this.data = data.data
        }
      })
  }
}
