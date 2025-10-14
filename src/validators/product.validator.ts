// Product validator
import {z} from "zod";

export const codeParamSchema = z.object({
    code: z.string().min(1),
});