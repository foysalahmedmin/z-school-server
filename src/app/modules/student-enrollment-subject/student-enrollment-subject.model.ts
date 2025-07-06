import { model, Schema } from 'mongoose';

const studentEnrollmentSubjectSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  enrollment: {
    type: Schema.Types.ObjectId,
    ref: 'StudentEnrollment',
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
});

export const StudentEnrollmentSubject = model(
  'StudentEnrollmentSubject',
  studentEnrollmentSubjectSchema,
);
