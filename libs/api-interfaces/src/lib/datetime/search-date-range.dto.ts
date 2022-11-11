import { IsDateString, IsOptional } from 'class-validator'

export class SearchDateRangeDto {
  @IsDateString()
  @IsOptional()
  startDate?: Date

  @IsDateString()
  @IsOptional()
  endDate?: Date
}
