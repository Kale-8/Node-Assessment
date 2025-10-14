// Address validator
import {z} from "zod";

export const createAddressSchema = z.object({
    clientId: z.number().int().positive(),
    address: z.string().min(5),
    city: z.string().min(2),
});

export const updateAddressSchema = z.object({
    clientId: z.number().int().positive().optional(),
    address: z.string().min(5).optional(),
    city: z.string().min(2).optional(),
});