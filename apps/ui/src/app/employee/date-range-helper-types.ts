import { DateRangeIncludingEmployeeAndDepartment } from '@pipeline-project-template/api-interfaces'

export interface DateRangeWithStatus extends DateRangeIncludingEmployeeAndDepartment {
  status: DateRangeEmploymentStatus
}

export enum DateRangeEmploymentStatus {
  NONE = 'none',
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
  BOTH = 'both',
}

export type SortedEmploymentStats = { [key in DateRangeEmploymentStatus]: DateRangeWithStatus[] }
