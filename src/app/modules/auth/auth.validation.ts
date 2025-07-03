import { z } from 'zod';

export const signinValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(12),
  }),
});

export const signupValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(12),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refresh_token: z.string(),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z
    .object({
      current_password: z.string().min(6).max(12),
      new_password: z.string().min(6).max(12),
    })
    .refine((value) => value.current_password !== value.new_password, {
      message: 'New password must be unique',
    }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(12),
  }),
});
