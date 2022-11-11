import { IsNumber, IsOptional, Min } from 'class-validator'

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number = 50

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number = 0
}
