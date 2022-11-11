import { DepartmentHttpService } from './department-http.service'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpService: DepartmentHttpService) {}

  getAllDepartments() {
    return this.httpService.getAllDepartments()
  }
}
