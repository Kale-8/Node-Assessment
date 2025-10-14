// Order validator
import {z} from "zod";

const itemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
});

export const createOrderSchema = z.object({
    clientId: z.number().int().positive(),
    warehouseId: z.number().int().positive(),
    items: z.array(itemSchema).min(1),
});

export const changeStatusSchema = z.object({
    status: z.enum(["pending", "in_transit", "delivered"]),
});