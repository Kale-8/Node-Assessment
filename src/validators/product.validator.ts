// Product validator
import {z} from "zod";

export const codeParamSchema = z.object({
    code: z.string().min(1),
});

export const createProductSchema = z.object({
    code: z.string().min(1),
    name: z.string().min(2),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().int().min(0),
});

export const updateProductSchema = z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().min(0).optional(),
});