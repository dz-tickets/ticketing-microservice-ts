import {CustomError, ErrorResponse} from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('NotAuthorizedError');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializedErrors(): ErrorResponse[] {
        return [{message: 'Not authorized'}];
    }
}