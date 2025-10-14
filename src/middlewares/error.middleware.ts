import {Request, Response, NextFunction} from "express";

/**
 * Global error handler. Controllers/services should throw errors.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    const message = err.message || "Internal server error";
    const status = err.status || 500;
    res.status(status).json({message});
}