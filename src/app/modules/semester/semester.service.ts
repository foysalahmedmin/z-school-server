import { TSemester } from './academic-semester.type';
import { Semester } from './semester.model';

const createSemesterIntoDB = async (payload: TSemester) => {
  const result = await Semester.create(payload);
  return result;
};

const getAllSemestersFromDB = async () => {
  const result = await Semester.find();
  return result;
};

const getSingleSemesterFromDB = async (_id: string) => {
  const result = await Semester.findById(_id);
  return result;
};

const updateSemesterIntoDB = async (
  _id: string,
  payload: Partial<TSemester>,
) => {
  if (payload.name && payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await Semester.findOneAndUpdate({ _id: _id }, payload, {
    new: true,
  });
  return result;
};

export const SemesterServices = {
  createSemesterIntoDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
  updateSemesterIntoDB,
};
