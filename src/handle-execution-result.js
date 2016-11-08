import { Result } from './result';

const isPromise = (obj) => typeof obj !== 'undefined' && typeof obj.then === 'function';

const buildSuccessResponse = (result) => {
  return result.statusCode ? result : { statusCode: 200, result };
};

const buildFailureResponse = (err) => {
  return { statusCode: err.statusCode || 500, message: err.message || err };
};

export const handleExecutionResult = async (moduleExecutor) => {
  try {
    const result = moduleExecutor();
    if (isPromise(result)) {
      return buildSuccessResponse(await result);
    } else {
      return buildSuccessResponse(result);
    }
  } catch (err) {
    return buildFailureResponse(err);
  }
};