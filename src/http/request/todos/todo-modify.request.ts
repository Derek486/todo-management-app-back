import z from 'zod'

export const todoCreateSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  description: z.string().optional().default(''),
  memberId: z.string({
    required_error: 'Member is required'
  }).uuid(),
  deadLine: z.date().optional()
});

export const todoUpdateSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  description: z.string({
    required_error: 'Description is required'
  }),
  memberId: z.string({
    required_error: 'Member is required'
  }).uuid(),
  status: z.enum(['0', '1', '2', '3'], {
    required_error: 'Status is required'
  }),
  deadLine: z.date({
    required_error: 'DeadLine is required'
  })
});

export const todoPartialSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  memberId: z.string().uuid().optional(),
  status: z.enum(['0', '1', '2', '3']).optional(),
  deadLine: z.date().optional()
});

export type ITodoCreateBody = z.infer<typeof todoCreateSchema>;
export type ITodoUpdateBody = z.infer<typeof todoUpdateSchema>;
export type ITodoPartialBody = z.infer<typeof todoPartialSchema>;