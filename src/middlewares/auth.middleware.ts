import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Middleware to authenticate a user
export function authenticate(req: Request & { user?: any }, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({message: "Missing authorization"});
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({message: "Invalid authorization header"});
    const token = parts[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET) as any;
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});
    }
}