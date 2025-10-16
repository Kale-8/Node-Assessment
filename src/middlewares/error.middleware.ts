import {Request, Response, NextFunction} from "express";

/**
 * Global error handler. Controllers/services should throw objects like { status, message } or Error with message.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = (err && (err.status || err.statusCode)) || 500;
    const message = (err && err.message) || (typeof err === "string" ? err : "Internal server error");

    if (process.env.NODE_ENV !== "production") {
        console.error(err);
    }

    res.status(status).json({message});
}