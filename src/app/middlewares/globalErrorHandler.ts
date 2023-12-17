import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let status = 500;
  let message = err.message || 'Something is went wrong';

  return res.status(status).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
