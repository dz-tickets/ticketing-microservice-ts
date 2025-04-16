import { CustomError, ErrorResponse } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode: number = 400;
    constructor(private badRequestMessage: string) {
        super("BadRequestError");
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializedErrors(): ErrorResponse[] {
        return [{ message: this.badRequestMessage }];
    }
}