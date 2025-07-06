import { Department } from './department.model';
import { TDepartment } from './department.type';

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await Department.create(payload);
  return result;
};

const getAllDepartmentsFromDB = async () => {
  const result = await Department.find().populate('faculty');
  return result;
};

const getSingleDepartmentFromDB = async (_id: string) => {
  const result = await Department.findById(_id).populate('faculty');
  return result;
};

const updateDepartmentIntoDB = async (
  _id: string,
  payload: Partial<TDepartment>,
) => {
  const result = await Department.findOneAndUpdate({ _id: _id }, payload, {
    new: true,
  });
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentIntoDB,
};
