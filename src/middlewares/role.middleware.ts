import {Request, Response, NextFunction} from "express";

// Role permission middleware
export function permit(roles: Array<"admin" | "analyst">) {
    return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) return res.status(401).json({message: "Unauthorized"});
        if (!roles.includes(user.role)) return res.status(403).json({message: "Forbidden"});
        next();
    };
}