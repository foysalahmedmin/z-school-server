import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../builder/AppError';
import { TAcademicDepartment } from './academic-department.type';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);

// academicDepartmentSchema.pre('save', async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExist) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'This department is already exist!',
//     );
//   }

//   next();
// });

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exist! ',
    );
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'Academic-Department',
  academicDepartmentSchema,
);
