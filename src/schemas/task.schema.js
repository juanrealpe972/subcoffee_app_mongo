import { z } from 'zod'

export const createTaksSchema = z.object({
    title: z.string({
        required_error: "title is required"
    }),
    description: z.string({
        required_error: "Description is required"
    }),
    dateTime: z.string({
        required_error: "Date is required"
    }),
    date: z.string().datetime().optional()
})