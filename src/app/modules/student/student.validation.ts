import { z } from 'zod';

// Reusable nested types
const nameSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
});

const addressSchema = z.object({
  country: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  details: z.string().optional(),
});

const fullAddressSchema = z.object({
  present: addressSchema.optional(),
  permanent: addressSchema,
});

const guardianSchema = z.object({
  name: z.string().min(1),
  relation: z.string().min(1),
  occupation: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  address: addressSchema.optional(),
});

// Main Student Schema
export const studentValidationSchema = z.object({
  name: nameSchema,
  code: z.string().min(1),
  user: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  emergency_phone: z.string().min(10),
  image: z.string().url().optional(),
  avatar: z.string().url().optional(),
  gender: z.enum(['male', 'female', 'others']).optional(),
  date_of_birth: z.coerce.date().optional(),
  blood_group: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  address: fullAddressSchema,
  guardian: guardianSchema,
  local_guardian: guardianSchema.optional(),
  department: z.string().optional(),
  is_deleted: z.boolean(),
});
