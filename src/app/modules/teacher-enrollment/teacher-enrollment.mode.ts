import { model, Schema } from 'mongoose';

const teacherEnrollmentSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
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
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  role: {
    type: String,
    enum: ['subject_teacher', 'class_teacher', 'head_teacher'],
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  assigned_at: {
    type: Date,
    default: Date.now,
  },
});

teacherEnrollmentSchema.index(
  { teacher: 1, session: 1, class: 1, section: 1, subject: 1 },
  { unique: true },
);

export const TeacherEnrollment = model(
  'TeacherEnrollment',
  teacherEnrollmentSchema,
);
