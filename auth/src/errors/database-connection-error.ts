export class DatabaseConnectionError extends Error {
    reasone: string = "Error connecting to database";
    constructor() {
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}