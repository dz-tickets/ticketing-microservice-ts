export type ErrorResponse = {
    message: string, field?: string
}

export abstract class CustomError extends Error {
    abstract statusCode: number;

    protected constructor(private errorMessage: string) {
        super(errorMessage);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializedErrors(): ErrorResponse[];
}