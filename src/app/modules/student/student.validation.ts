import { z } from 'zod';

// Custom Validators
function capitalizeValidator(value: string) {
  const correctValue =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  return value === correctValue;
}

function isValidBangladeshContactNumber(value: string) {
  const bangladeshContactNumberRegex = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
  return bangladeshContactNumberRegex.test(value);
}

// Validation Schemas
const nameValidationSchema = z.object({
  first_name: z.string().min(1).max(20).refine(capitalizeValidator, {
    message: 'First name is not in capitalize format',
  }),
  middle_name: z
    .string()
    .max(20)
    .refine(capitalizeValidator, {
      message: 'Middle name is not in capitalize format',
    })
    .optional(),
  last_name: z
    .string()
    .max(20)
    .refine(capitalizeValidator, {
      message: 'Last name is not in capitalize format',
    })
    .optional(),
});

const addressValidationSchema = z.object({
  country: z.string(),
  street: z.string(),
  city: z.string(),
  details: z.string().optional(),
});

const fullAddressValidationSchema = z.object({
  present: addressValidationSchema.optional(),
  permanent: addressValidationSchema,
});

const guardianValidationSchema = z.object({
  name: z.string(),
  relation: z.string(),
  occupation: z.string(),
  contact_number: z.string().refine(isValidBangladeshContactNumber, {
    message: 'Contact number is not valid',
  }),
  address: addressValidationSchema.optional(),
});

const mainGuardianValidationSchema = z.object({
  first_guardian: guardianValidationSchema,
  second_guardian: guardianValidationSchema.optional(),
});

const studentValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string().min(6).max(12),
    student: z.object({
      name: nameValidationSchema,
      profile_image: z.string().url().optional(),
      avatar: z.string().url().optional(),
      gender: z.enum(['male', 'female', 'others']).optional(),
      date_of_birth: z.string().optional(),
      email: z.string().email(),
      contact_number: z.string().refine(isValidBangladeshContactNumber, {
        message: 'Contact number is not valid',
      }),
      emergency_contact_number: z
        .string()
        .refine(isValidBangladeshContactNumber, {
          message: 'Emergency contact number is not valid',
        }),
      blood_group: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      address: fullAddressValidationSchema,
      guardian: z.array(guardianValidationSchema),
      local_guardian: guardianValidationSchema,
      admission_semester: z.string(),
      academic_department: z.string().optional(),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    password: z.string().min(6).max(12).optional(),
    student: z.object({
      name: nameValidationSchema.optional(),
      profile_image: z.string().url().optional(),
      avatar: z.string().url().optional(),
      gender: z.enum(['male', 'female', 'others']).optional(),
      date_of_birth: z.string().optional(),
      email: z.string().email().optional(),
      contact_number: z
        .string()
        .refine(isValidBangladeshContactNumber, {
          message: 'Contact number is not valid',
        })
        .optional(),
      emergency_contact_number: z
        .string()
        .refine(isValidBangladeshContactNumber, {
          message: 'Emergency contact number is not valid',
        })
        .optional(),
      blood_group: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      address: fullAddressValidationSchema.optional(),
      guardian: mainGuardianValidationSchema.optional(),
      local_guardian: guardianValidationSchema.optional(),
      admission_semester: z.string(),
      academic_department: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidation: studentValidationSchema,
  updateStudentValidationSchema,
};
