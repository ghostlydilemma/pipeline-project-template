import { ActivatedRoute, Router } from '@angular/router'
import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { catchError, of as observableOf, startWith, switchMap } from 'rxjs'

import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { EmployeeService } from '../service/employee.service'
import { MatPaginator } from '@angular/material/paginator'
import { PaginationQueryDto } from '@pipeline-project-template/api-interfaces'

@Component({
  selector: 'pipeline-project-template-employee-table',
  templateUrl: './employee-overview.component.html',
  styleUrls: ['./employee-overview.component.scss'],
})
@UntilDestroy()
export class EmployeeOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'address', 'dateOfBirth', 'salary', 'active', 'department', 'action']
  data: EmployeeDto[] = []

  pageSize = 15
  resultsLength = 0
  isLoadingResults = true

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) {}

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

          return this.employeeService.getAllEmployees(paginationOptions).pipe(catchError(() => observableOf(null)))
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

  navigateToEmployee(id: string) {
    this.router.navigate(['./', id], { relativeTo: this.route })
  }
}
