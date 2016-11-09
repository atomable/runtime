const isPromise = obj =>
  (typeof obj !== 'undefined' && typeof obj.then === 'function');

const buildSuccessResponse = result =>
  (result.statusCode && result.body ? result : { statusCode: 200, body: result });

const buildFailureResponse = err =>
  ({ statusCode: err.statusCode || 500, body: err.message || err });

export const handleExecutionResult = async (moduleExecutor) => { // eslint-disable-line
  try {
    const result = moduleExecutor();
    if (isPromise(result)) {
      return buildSuccessResponse(await result);
    }
    return buildSuccessResponse(result);
  } catch (err) {
    return buildFailureResponse(err);
  }
};
