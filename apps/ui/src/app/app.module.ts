import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  MatNativeDateModule,
} from '@angular/material/core'
import { LOCALE_ID, NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { EmployeeModule } from './employee/employee.module'
import { HttpClientModule } from '@angular/common/http'
import { NavigationModule } from './navigation/navigation.module'
import { enGB } from 'date-fns/locale'

export const DD_MM_YYYY_Format: MatDateFormats = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavigationModule,
    BrowserAnimationsModule,
    EmployeeModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: enGB },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format },
    { provide: LOCALE_ID, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
