import {
  DateRangeDto,
  EMPLOYEE_ABSENCE_ROUTE,
  EMPLOYEE_ROUTE,
  PaginatedListDto,
  PaginationQueryDto,
} from '@pipeline-project-template/api-interfaces'

import { API_URL } from '../../constants'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EmployeeAbsenceHttpService {
  constructor(private http: HttpClient) {}

  getAbsencesByEmployeeId(
    employeeId: string,
    paginationQueryDto?: PaginationQueryDto
  ): Observable<PaginatedListDto<DateRangeDto>> {
    return this.http.get<PaginatedListDto<DateRangeDto>>(
      `${API_URL}/${EMPLOYEE_ROUTE}/${employeeId}/${EMPLOYEE_ABSENCE_ROUTE}?offset=${paginationQueryDto?.offset}&limit=${paginationQueryDto?.limit}`
    )
  }
}
