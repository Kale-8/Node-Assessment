import {Request, Response, NextFunction} from "express";
import {ZodSchema} from "zod";

/**
 * Generic validator middleware.
 * Provide schema and target: 'body' | 'params' | 'query'
 */
export function validate(schema: ZodSchema<any>, target: "body" | "params" | "query" = "body") {
    return (req: Request, res: Response, next: NextFunction) => {
        const toValidate = (req as any)[target];
        const result = schema.safeParse(toValidate);
        if (!result.success) {
            const message = result.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
            return res.status(400).json({message});
        }
        // replace validated data
        (req as any)[target] = result.data;
        next();
    };
}