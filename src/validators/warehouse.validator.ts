// Warehouse validator
import {z} from "zod";

export const createWarehouseSchema = z.object({
    name: z.string().min(2),
    location: z.string().min(2),
});

export const toggleWarehouseSchema = z.object({
    active: z.boolean(),
});