import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint()
export class IsValidNameValidator implements ValidatorConstraintInterface {
  validate(stringToValidate: string): boolean {
    const nameRegex = /^[A-Za-z\xC0-\xFF][A-Za-z\xC0-\xFF'-]+([ A-Za-z\xC0-\xFF][A-Za-z\xC0-\xFF'-]+)*$/u
    return nameRegex.test(stringToValidate)
  }

  defaultMessage(): string {
    return 'Name ($value) is not valid'
  }
}

export function IsValidName(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isValidName',
      target: (object as Record<string, unknown>).constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsValidNameValidator,
    })
  }
}
