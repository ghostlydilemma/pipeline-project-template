import {
  CreateEmployeeDto,
  DateRangeIncludingEmployeeAndDepartment,
  EMPLOYEE_EMPLOYMENT_ROUTE,
  EMPLOYEE_REEMPLOY_ROUTE,
  EMPLOYEE_ROUTE,
  EMPLOYEE_SALARY_ROUTE,
  EMPLOYEE_STATS_ROUTE,
  EMPLOYEE_UNEMPLOY_ROUTE,
  PaginatedListDto,
  PaginationQueryDto,
  SearchDateRangeDto,
  UpdateEmployeeDto,
} from '@pipeline-project-template/api-interfaces'

import { API_URL } from '../../constants'
import { EmployeeDto } from '@pipeline-project-template/api-interfaces'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EmployeeHttpService {
  constructor(private http: HttpClient) {}

  getAllEmployees(paginationQueryDto?: PaginationQueryDto) {
    return this.http.get<PaginatedListDto<EmployeeDto>>(
      `${API_URL}/${EMPLOYEE_ROUTE}?offset=${paginationQueryDto?.offset}&limit=${paginationQueryDto?.limit}`
    )
  }

  getEmployeeById(employeeId: string) {
    return this.http.get<EmployeeDto>(`${API_URL}/${EMPLOYEE_ROUTE}/${employeeId}`)
  }

  createEmployee(employee: CreateEmployeeDto) {
    return this.http.post<EmployeeDto>(`${API_URL}/${EMPLOYEE_ROUTE}`, employee)
  }

  updateEmployee(employeeId: string, employee: UpdateEmployeeDto) {
    return this.http.put<EmployeeDto>(`${API_URL}/${EMPLOYEE_ROUTE}/${employeeId}`, employee)
  }

  unemployEmployee(employeeId: string) {
    return this.http.patch<EmployeeDto>(`${API_URL}/${EMPLOYEE_ROUTE}/${employeeId}/${EMPLOYEE_UNEMPLOY_ROUTE}`, null)
  }

  reemployEmployee(employeeId: string) {
    return this.http.patch<EmployeeDto>(`${API_URL}/${EMPLOYEE_ROUTE}/${employeeId}/${EMPLOYEE_REEMPLOY_ROUTE}`, null)
  }

  getAverageSalaryStatistic(departmentId?: string) {
    const query = `${departmentId ? `?department=${departmentId}` : ''}`

    return this.http.get<number>(
      `${API_URL}/${EMPLOYEE_ROUTE}/${EMPLOYEE_STATS_ROUTE}/${EMPLOYEE_SALARY_ROUTE}${query}`
    )
  }

  getEmploymentChangeStatistic(departmentId?: string, daterange?: SearchDateRangeDto) {
    const queries = [
      departmentId ? `department=${departmentId}` : null,
      daterange?.startDate ? `dateFrom=${daterange.startDate.toISOString()}` : null,
      daterange?.endDate ? `dateTo=${daterange.endDate.toISOString()}` : null,
    ]

    return this.http.get<DateRangeIncludingEmployeeAndDepartment[]>(
      `${API_URL}/${EMPLOYEE_ROUTE}/${EMPLOYEE_STATS_ROUTE}/${EMPLOYEE_EMPLOYMENT_ROUTE}${this.buildComplexUrlQuery(
        queries
      )}`
    )
  }

  private buildComplexUrlQuery(queries: (string | null)[]) {
    const filteredQuery = queries.filter((val) => val)

    if (filteredQuery.length !== 0) {
      const queryString = filteredQuery.reduce((previousValue, currentValue) => {
        if (currentValue) {
          return `${previousValue}&${currentValue}`
        }
        return ''
      })

      if (queryString === '') return ''
      return `?${queryString}`
    }

    return ''
  }
}
