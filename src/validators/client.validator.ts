// Client validator
import {z} from "zod";

export const createClientSchema = z.object({
    document: z.string().min(4),
    name: z.string().min(2),
    email: z.email(),
});

export const findClientByDocumentSchema = z.object({
    document: z.string().min(4),
});