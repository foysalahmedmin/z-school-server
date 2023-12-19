import { z } from 'zod';

const facultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
    }),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema: facultyValidationSchema,
  updateFacultyValidationSchema,
};
