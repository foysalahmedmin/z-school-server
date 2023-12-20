import { TGenericErrorResponse } from '../interface/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorSources = Object.entries(err?.keyValue).map((val) => {
    const [key, value] = val;
    return {
      path: key || '',
      message: `${value} is already exists`,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleDuplicateError;
