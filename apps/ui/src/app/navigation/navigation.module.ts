import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NavigationComponent } from './navigation.component'
import { NgModule } from '@angular/core'
import { RouterLinkWithHref } from '@angular/router'

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterLinkWithHref, MatToolbarModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
