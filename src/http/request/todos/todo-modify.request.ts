import z from 'zod'

export const todoCreateSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  description: z.string({
    required_error: 'Description is required'
  }),
});

export const todoUpdateSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  description: z.string({
    required_error: 'Description is required'
  }),
  isComplete: z.boolean({
    required_error: 'isComplete is required'
  }),
});

export const todoPartialSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isComplete: z.boolean().optional(),
});

export type ITodoCreateBody = z.infer<typeof todoCreateSchema>;
export type ITodoUpdateBody = z.infer<typeof todoUpdateSchema>;
export type ITodoPartialBody = z.infer<typeof todoPartialSchema>;