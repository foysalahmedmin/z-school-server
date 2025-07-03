import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterServices } from './semester.service';

const createSemester = catchAsync(async (req, res) => {
  const result = await SemesterServices.createSemesterIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester is created succesfully',
    data: result,
  });
});

const getAllSemesters = catchAsync(async (_req, res) => {
  const result = await SemesterServices.getAllSemestersFromDB();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await SemesterServices.getSingleSemesterFromDB(_id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await SemesterServices.updateSemesterIntoDB(_id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const SemesterControllers = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
