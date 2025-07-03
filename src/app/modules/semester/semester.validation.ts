import { z } from 'zod';

export const semesterValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    year: z.string(),
    code: z.string(),
    start: z.date(),
    end: z.date(),
  }),
});
