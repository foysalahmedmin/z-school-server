import { Schema, model } from 'mongoose';
import { TSemester } from './semester.type';

const semesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

semesterSchema.pre('save', async function (next) {
  const isSemesterExists = await Semester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error('Semester is already exists !');
  }
  next();
});

export const Semester = model<TSemester>('Semester', semesterSchema);
