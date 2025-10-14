// Warehouse validator
import {z} from "zod";

export const toggleWarehouseSchema = z.object({
    active: z.boolean(),
});