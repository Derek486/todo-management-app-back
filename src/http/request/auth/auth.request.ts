import z from 'zod'

export const registerSchema = z.object({
  email: z.string({
    required_error: 'Email is required'
  }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string({
    required_error: 'Password is required'
  }),
  confirmPassword: z.string({
    required_error: 'Confirm password is required'
  }),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required'
  }),
  password: z.string({
    required_error: 'Password is required'
  }),
});

export type IRegisterBody = z.infer<typeof registerSchema>;
export type ILoginBody = z.infer<typeof loginSchema>;