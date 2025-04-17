import {ValidationError} from 'express-validator';
import {CustomError, ErrorResponse} from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode: number = 400;

    constructor(private errors: ValidationError[]) {
        super("RequestValidationError");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializedErrors(): ErrorResponse[] {
        return this.errors.map((error): ErrorResponse => {
            if (error.type === "field") {
                return {
                    message: error.msg,
                    field: error.path
                };
            }
            return {message: error.msg || 'Invalid parameter'};
        });
    }
}