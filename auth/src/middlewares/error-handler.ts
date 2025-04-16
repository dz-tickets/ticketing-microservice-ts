import {Request, Response, NextFunction} from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof RequestValidationError){
        console.log("Handling RequestValidationError");
        res.status(400).send({
            message: "RequestValidationError"
        });
    } else if(err instanceof DatabaseConnectionError){
        res.status(400).send({
            message: "DatabaseConnectionError"
        });
    } else {
        res.status(400).send({
            message: err.message
        });
    }

};