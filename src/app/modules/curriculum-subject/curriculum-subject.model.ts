import { model, Schema } from 'mongoose';

const curriculumSubjectSchema = new Schema({
  curriculum: {
    type: Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  status: {
    type: String,
    enum: ['main', 'optional'],
    default: 'main',
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
});

export const CurriculumSubject = model(
  'CurriculumSubject',
  curriculumSubjectSchema,
);
