import { z } from 'zod'

export const generateOutlineFormSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(5000),
  weekCount: z.coerce.number().int().min(1).max(13),
})

export type GenerateOutlineFormValues = z.infer<typeof generateOutlineFormSchema>

export const confirmOutlineFormSchema = z.object({
  content: z.string().min(10).max(5000),
})

export type ConfirmOutlineFormValues = z.infer<typeof confirmOutlineFormSchema>
