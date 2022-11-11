import { IsBoolean, IsDateString, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

import { IsValidMiddlename } from '../validators/is-valid-middlename.validator'
import { IsValidName } from '../validators/is-valid-name.validator'

export class UpdateEmployeeDto {
  @IsString()
  @IsValidName()
  @IsOptional()
  firstname?: string

  @IsString()
  @IsValidMiddlename()
  @IsOptional()
  middlename?: string

  @IsString()
  @IsValidName()
  @IsOptional()
  lastname?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date

  @IsNumber()
  @IsPositive()
  @IsOptional()
  salary?: number

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsString()
  @IsOptional()
  department?: string
}
