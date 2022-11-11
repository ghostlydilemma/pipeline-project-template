import { DateRangeDto, PaginatedListDto, PaginationQueryDto } from '@pipeline-project-template/api-interfaces'

import { EmployeeAbsenceHttpService } from './employee-absence-http.service'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EmployeeAbsenceService {
  constructor(private absenceHttpService: EmployeeAbsenceHttpService) {}

  getAbsencesByEmployeeId(
    employeeId: string,
    paginationOptions?: PaginationQueryDto
  ): Observable<PaginatedListDto<DateRangeDto>> {
    return this.absenceHttpService.getAbsencesByEmployeeId(employeeId, paginationOptions)
  }
}
