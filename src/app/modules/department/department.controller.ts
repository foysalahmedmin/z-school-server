import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DepartmentServices } from './department.service';

const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartmentIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (_req, res) => {
  const result = await DepartmentServices.getAllDepartmentsFromDB();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic departments are retrieved successfully',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await DepartmentServices.getSingleDepartmentFromDB(_id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department is retrieved successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await DepartmentServices.updateDepartmentIntoDB(_id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department is updated successfully',
    data: result,
  });
});

export const DepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
};
