import { RouterModule, Routes } from '@angular/router'

import { EMPLOYEE_QUERY_ID } from '@pipeline-project-template/api-interfaces'
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component'
import { EmployeeOverviewComponent } from './employee-overview/employee-overview.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: '',
    component: EmployeeOverviewComponent,
  },
  {
    path: `:${EMPLOYEE_QUERY_ID}`,
    component: EmployeeDetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
