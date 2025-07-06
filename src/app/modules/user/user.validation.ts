import { z } from 'zod';

const idSchema = z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
  message: 'Invalid ID format',
});

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(12, 'Password must be at most 12 characters'),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .optional(),
    email: z.string().email('Invalid email format').optional(),
  }),
});

export const updateUserByAdminValidationSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .optional(),
    email: z.string().email('Invalid email format').optional(),
    status: z.enum(['in-progress', 'blocked']).optional(),
    role: z
      .enum(['editor', 'author', 'contributor', 'subscriber', 'user'])
      .optional(),
    is_verified: z.boolean().optional(),
  }),
});

export const updateUsersByAdminValidationSchema = z.object({
  body: z.object({
    ids: z
      .array(idSchema, {
        required_error: 'At least one user ID is required',
        invalid_type_error: 'User IDs must be an array of strings',
      })
      .nonempty('At least one user ID is required'),
    status: z.enum(['in-progress', 'blocked']).optional(),
    role: z
      .enum(['editor', 'author', 'contributor', 'subscriber', 'user'])
      .optional(),
    is_verified: z.boolean().optional(),
  }),
});

export const userOperationValidationSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});

export const usersOperationValidationSchema = z.object({
  body: z.object({
    ids: z.array(idSchema).nonempty('At least one user ID is required'),
  }),
});
