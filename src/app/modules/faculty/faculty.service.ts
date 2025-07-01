import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.type';

const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await Faculty.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find();
  return result;
};

const getSingleFacultyFromDB = async (_id: string) => {
  const result = await Faculty.findById(_id);
  return result;
};

const updateFacultyIntoDB = async (_id: string, payload: Partial<TFaculty>) => {
  const result = await Faculty.findOneAndUpdate({ _id: _id }, payload, {
    new: true,
  });
  return result;
};

export const FacultyServices = {
  createFacultyIntoDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
};
