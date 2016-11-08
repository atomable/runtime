import { Result } from './result';

const isPromise = (obj) => typeof obj !== 'undefined' && typeof obj.then === 'function';

const buildSuccessResponse = (result) => {
  return result.status ? result : { status: 200, result };
};

const buildFailureResponse = (err) => {
  return { status: err.status || 500, message: err.message || err };
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