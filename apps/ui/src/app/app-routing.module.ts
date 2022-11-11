import { RouterModule, Routes } from '@angular/router'

import { EMPLOYEE_ROUTE } from '@pipeline-project-template/api-interfaces'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: EMPLOYEE_ROUTE,
    loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: '',
    redirectTo: EMPLOYEE_ROUTE,
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
