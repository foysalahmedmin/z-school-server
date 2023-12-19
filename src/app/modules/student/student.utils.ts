import { TStudent } from './student.interface';

export const studentUpdateDataModifier = async (payload: Partial<TStudent>) => {
  try {
    const { name, guardian, local_guardian, address, ...remainingStudentData } =
      payload;

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }

    if (address && Object.keys(address).length) {
      const { permanent, present } = address;
      if (permanent && Object.keys(permanent).length) {
        for (const [key, value] of Object.entries(permanent)) {
          modifiedUpdatedData[`address.permanent.${key}`] = value;
        }
      }
      if (present && Object.keys(present).length) {
        for (const [key, value] of Object.entries(present)) {
          modifiedUpdatedData[`address.present.${key}`] = value;
        }
      }
    }

    if (guardian && Object.keys(guardian).length) {
      const { first_guardian, second_guardian } = guardian;
      // first guardian;
      if (first_guardian && Object.keys(first_guardian).length) {
        const { address, ...remainingFirstGuardianData } = first_guardian;
        if (address && Object.keys(address).length) {
          for (const [key, value] of Object.entries(address)) {
            modifiedUpdatedData[`guardian.first_guardian.address${key}`] =
              value;
          }
        }
        for (const [key, value] of Object.entries(remainingFirstGuardianData)) {
          modifiedUpdatedData[`guardian.first_guardian.${key}`] = value;
        }
      }
      // first guardian;
      if (second_guardian && Object.keys(second_guardian).length) {
        const { address, ...remainingSecondGuardianData } = second_guardian;
        if (address && Object.keys(address).length) {
          for (const [key, value] of Object.entries(address)) {
            modifiedUpdatedData[`guardian.second_guardian.address${key}`] =
              value;
          }
        }
        for (const [key, value] of Object.entries(
          remainingSecondGuardianData,
        )) {
          modifiedUpdatedData[`guardian.second_guardian.${key}`] = value;
        }
      }
    }

    if (local_guardian && Object.keys(local_guardian).length) {
      const { address, ...remainingLocalGuardianData } = local_guardian;
      if (address && Object.keys(address).length) {
        for (const [key, value] of Object.entries(address)) {
          modifiedUpdatedData[`local_guardian.address${key}`] = value;
        }
      }
      for (const [key, value] of Object.entries(remainingLocalGuardianData)) {
        modifiedUpdatedData[`local_guardian.${key}`] = value;
      }
    }

    return modifiedUpdatedData;
  } catch (err) {
    throw new Error('Fail to modify student update data');
  }
};
