import { Student } from '../student/student.model';
import { TStudent } from './student.type';

export const findLastStudent = async (): Promise<{
  code: string;
} | null> => {
  const student = await Student.findOne({}, { _id: 0, code: 1 })
    .sort({ created_at: -1 })
    .lean();
  return student;
};

export const generateStudentCode = async () => {
  let serial = 1;

  const last_student = await findLastStudent();
  if (last_student) {
    serial = Number(last_student.code.split('-')[1] || 1) + 1;
  }

  const code = `Z-${serial.toString().padStart(6, '0')}`;

  return code;
};

export const formatStudentUpdatePayload = async (
  payload: Partial<TStudent>,
): Promise<Record<string, unknown>> => {
  try {
    const {
      name,
      address,
      present_address,
      guardian,
      local_guardian,
      ...remainingStudentData
    } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    };

    // Handle name
    if (name && typeof name === 'object') {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    } else {
      if (name) modifiedUpdatedData['name'] = name;
    }

    // Handle permanent address
    if (address && typeof address === 'object') {
      for (const [key, value] of Object.entries(address)) {
        modifiedUpdatedData[`address.${key}`] = value;
      }
    }

    // Handle present address
    if (present_address && typeof present_address === 'object') {
      for (const [key, value] of Object.entries(present_address)) {
        modifiedUpdatedData[`present_address.${key}`] = value;
      }
    }

    // Handle guardian (single guardian as per your schema)
    if (guardian && typeof guardian === 'object') {
      const { address, ...guardianFields } = guardian;

      if (address && typeof address === 'object') {
        for (const [key, value] of Object.entries(address)) {
          modifiedUpdatedData[`guardian.address.${key}`] = value;
        }
      }

      for (const [key, value] of Object.entries(guardianFields)) {
        modifiedUpdatedData[`guardian.${key}`] = value;
      }
    }

    // Handle local_guardian
    if (local_guardian && typeof local_guardian === 'object') {
      const { address, ...localFields } = local_guardian;

      if (address && typeof address === 'object') {
        for (const [key, value] of Object.entries(address)) {
          modifiedUpdatedData[`local_guardian.address.${key}`] = value;
        }
      }

      for (const [key, value] of Object.entries(localFields)) {
        modifiedUpdatedData[`local_guardian.${key}`] = value;
      }
    }

    return modifiedUpdatedData;
  } catch (err) {
    throw new Error('Failed to format student update payload');
  }
};
