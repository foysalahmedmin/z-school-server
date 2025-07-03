import mongoose, { Types } from 'mongoose';
import { TSemester } from '../academic-semester/academic-semester.type';
import { Student } from '../student/student.model';
const ObjectId = mongoose.Types.ObjectId;

const findLastStudentId = async (
  semester_id: Types.ObjectId,
): Promise<string | undefined> => {
  const lastStudent = await Student.findOne(
    { semester: new ObjectId(semester_id) },
    { _id: 0, id: 1 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentCode = async (payload: Partial<TSemester>) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId(payload._id as Types.ObjectId);

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  const code = `${payload.year}${payload.code}${incrementId}`;

  return code;
};
