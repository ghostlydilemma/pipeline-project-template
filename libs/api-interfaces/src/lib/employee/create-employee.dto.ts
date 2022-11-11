import { IsDateString, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

import { IsValidMiddlename } from '../validators/is-valid-middlename.validator'
import { IsValidName } from '../validators/is-valid-name.validator'

export class CreateEmployeeDto {
  @IsString()
  @IsValidName()
  firstname: string

  @IsString()
  @IsValidMiddlename()
  @IsOptional()
  middlename: string

  @IsString()
  @IsValidName()
  lastname: string

  @IsString()
  address: string

  @IsDateString()
  dateOfBirth: Date

  @IsNumber()
  @IsPositive()
  salary: number

  @IsString()
  department: string
}
