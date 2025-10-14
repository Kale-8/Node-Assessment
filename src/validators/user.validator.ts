// User validator
import {z} from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["admin", "analyst"]),
});

export const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["admin", "analyst"]).optional(),
});