import { IsString, IsUUID } from 'class-validator'

export class DepartmentDto {
  @IsUUID()
  id: string

  @IsString()
  name: string
}
