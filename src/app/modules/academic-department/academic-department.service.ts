import { AcademicDepartment } from './academic-department.model';
import { TAcademicDepartment } from './academic-department.type';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('faculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findById(_id).populate('faculty');
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  _id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: _id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
