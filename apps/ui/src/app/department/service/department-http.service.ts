import { API_URL } from '../../constants'
import { DEPARTMENT_ROUTE } from '@pipeline-project-template/api-interfaces'
import { DepartmentDto } from '@pipeline-project-template/api-interfaces'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DepartmentHttpService {
  constructor(private http: HttpClient) {}

  getAllDepartments() {
    return this.http.get<DepartmentDto[]>(`${API_URL}/${DEPARTMENT_ROUTE}`)
  }
}
