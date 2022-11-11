import {
  CreateEmployeeDto,
  DateRangeIncludingEmployeeAndDepartment,
  PaginationQueryDto,
  SearchDateRangeDto,
  UpdateEmployeeDto,
} from '@pipeline-project-template/api-interfaces'
import { DateRangeEmploymentStatus, DateRangeWithStatus, SortedEmploymentStats } from '../date-range-helper-types'
import { Observable, map } from 'rxjs'

import { EmployeeHttpService } from './employee-http.service'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpService: EmployeeHttpService) {}

  getAllEmployees(paginationOptions?: PaginationQueryDto) {
    return this.httpService.getAllEmployees(paginationOptions)
  }

  getEmployeeById(employeeId: string) {
    return this.httpService.getEmployeeById(employeeId)
  }

  createEmployee(employee: CreateEmployeeDto) {
    return this.httpService.createEmployee(employee)
  }

  updateEmployee(employeeId: string, employee: UpdateEmployeeDto) {
    return this.httpService.updateEmployee(employeeId, employee)
  }

  unemployEmployee(employeeId: string) {
    return this.httpService.unemployEmployee(employeeId)
  }

  reemployEmployee(employeeId: string) {
    return this.httpService.reemployEmployee(employeeId)
  }

  getAverageSalaryStatistic(departmentId?: string) {
    return this.httpService.getAverageSalaryStatistic(departmentId)
  }

  getEmploymentChangeStatistic(departmentId?: string, daterange?: SearchDateRangeDto) {
    return this.mapEmploymentStats(this.httpService.getEmploymentChangeStatistic(departmentId, daterange), daterange)
  }

  private mapEmploymentStats(
    rawEmploymentStats: Observable<DateRangeIncludingEmployeeAndDepartment[]>,
    daterange: SearchDateRangeDto | undefined
  ) {
    return rawEmploymentStats.pipe(
      map((employmentStats) =>
        this.mapEmploymentDataToEmploymentStatus(this.assignEmploymentStatus(employmentStats, daterange))
      )
    )
  }

  private assignEmploymentStatus(
    employmentStats: DateRangeIncludingEmployeeAndDepartment[],
    daterange: SearchDateRangeDto | undefined
  ) {
    return employmentStats.map((stat) => {
      const statWithEmploymentStatus: DateRangeWithStatus = {
        ...stat,
        status: DateRangeEmploymentStatus.NONE,
      }
      if (new Date(stat.startDate) > (daterange?.startDate ?? new Date(0))) {
        statWithEmploymentStatus.status = DateRangeEmploymentStatus.INCOMING
      }
      if (stat.endDate && new Date(stat.endDate) < (daterange?.endDate ?? new Date())) {
        if (statWithEmploymentStatus.status === DateRangeEmploymentStatus.INCOMING) {
          statWithEmploymentStatus.status = DateRangeEmploymentStatus.BOTH
        } else {
          statWithEmploymentStatus.status = DateRangeEmploymentStatus.OUTGOING
        }
      }
      return statWithEmploymentStatus
    })
  }

  private mapEmploymentDataToEmploymentStatus(labeledEmploymentStats: DateRangeWithStatus[]) {
    const sortedEmploymentStats: SortedEmploymentStats = {
      [DateRangeEmploymentStatus.INCOMING]: [],
      [DateRangeEmploymentStatus.OUTGOING]: [],
      [DateRangeEmploymentStatus.BOTH]: [],
      [DateRangeEmploymentStatus.NONE]: [],
    }

    labeledEmploymentStats.forEach((labeledEmploymentStat) => {
      sortedEmploymentStats[labeledEmploymentStat.status].push(labeledEmploymentStat)
    })

    return sortedEmploymentStats
  }
}
