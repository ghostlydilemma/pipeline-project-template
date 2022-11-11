import { IsUUID } from 'class-validator'

export class FindEmployeeByIdDto {
  @IsUUID()
  id: string
}
