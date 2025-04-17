import {CustomError, ErrorResponse} from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason: string = "Error connecting to database";
    statusCode: number = 500;

    constructor() {
        super("DatabaseConnectionError");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializedErrors(): ErrorResponse[] {
        return [{message: this.reason}];
    }
}