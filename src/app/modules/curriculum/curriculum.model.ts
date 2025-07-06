import { Schema } from 'mongoose';

const curriculumSchema = new Schema({
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicClass',
    required: true,
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  credit: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  main_subject: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  optional_subject: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
  },
});

curriculumSchema.virtual('subjects', {
  ref: 'CurriculumSubject',
  localField: '_id',
  foreignField: 'enrollment',
});

curriculumSchema.virtual('main_subjects', {
  ref: 'CurriculumSubject',
  localField: '_id',
  foreignField: 'enrollment',
  match: { status: 'main' },
});

curriculumSchema.virtual('optional_subjects', {
  ref: 'CurriculumSubject',
  localField: '_id',
  foreignField: 'enrollment',
  match: { status: 'optional' },
});
