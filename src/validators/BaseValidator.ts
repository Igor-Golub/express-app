export abstract class BaseValidator<T> {
  abstract validate(value: T): Contracts.ErrorField[];
}
