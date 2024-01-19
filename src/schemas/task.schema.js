import { z } from 'zod'

export const createTaksSchema = z.object({
    title: z.string({
        required_error: "title is required"
    }),
    description: z.string({
        required_error: "Description must be a string"
    }),
    date: z.string().datetime().optional()
})