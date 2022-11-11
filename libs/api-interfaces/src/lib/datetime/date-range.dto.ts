import { IsDateString, IsOptional } from 'class-validator'

export class DateRangeDto {
  @IsDateString()
  startDate: Date

  @IsDateString()
  @IsOptional()
  endDate?: Date

  type: 'holiday' | 'illness' | 'employment' | 'blocked'
}
