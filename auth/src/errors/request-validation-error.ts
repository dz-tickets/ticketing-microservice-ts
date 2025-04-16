import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  constructor(private errors: ValidationError[]) {
    super('Validation failed');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}