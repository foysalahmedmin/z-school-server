import { model, Schema } from 'mongoose';
import { IStudentEnrollment } from './student-enrollment.type';

const studentEnrollmentSchema = new Schema<IStudentEnrollment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    roll: {
      type: String,
      required: true,
    },
    group: {
      type: String,
    },
    is_promoted: {
      type: Boolean,
      default: false,
    },
    promoted_to: {
      type: Schema.Types.ObjectId,
      ref: 'StudentEnrollment',
    },
    status: {
      type: String,
      enum: ['active', 'passed', 'repeated', 'dropped'],
      default: 'active',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  },
);

studentEnrollmentSchema.index(
  {
    student: 1,
    session: 1,
    department: 1,
    class: 1,
    section: 1,
    roll: 1,
    group: 1,
    status: 1,
  },
  { unique: true },
);

studentEnrollmentSchema.index(
  { student: 1 },
  {
    unique: true,
    partialFilterExpression: { status: 'active' },
  },
);

studentEnrollmentSchema.virtual('subjects', {
  ref: 'StudentEnrollmentSubject',
  localField: '_id',
  foreignField: 'enrollment',
});

studentEnrollmentSchema.virtual('main_subjects', {
  ref: 'StudentEnrollmentSubject',
  localField: '_id',
  foreignField: 'enrollment',
  match: { status: 'main' },
});

studentEnrollmentSchema.virtual('optional_subjects', {
  ref: 'StudentEnrollmentSubject',
  localField: '_id',
  foreignField: 'enrollment',
  match: { status: 'optional' },
});

export const StudentEnrollment = model<IStudentEnrollment>(
  'StudentEnrollment',
  studentEnrollmentSchema,
);
