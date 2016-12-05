const buildObjectResponse = (statusCode, headers, body) =>
  ({ statusCode, headers, body })

const isResponseObject = result =>
  typeof result === 'object' && result.statusCode

const ensureDefaultProps = (result) => {
  const validResult = result || {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  }

  validResult.statusCode = validResult.statusCode || 200
  validResult.headers = Object.assign({ 'Content-Type': 'application/json' }, validResult.headers)

  return validResult
}

const buildSuccessResponse = result =>
  (isResponseObject(result) ? ensureDefaultProps(result) : buildObjectResponse(200, { 'Content-Type': 'application/json' }, result))

const buildFailureResponse = err =>
  ({ statusCode: err.statusCode || 500, body: err.message || err })

const isPromise = promise =>
  (promise && typeof promise.then === 'function')

export const handleExecutionResult = async (moduleExecutor) => {
  try {
    const result = moduleExecutor()
    if (isPromise(result)) {
      return buildSuccessResponse(await result)
    }
    return buildSuccessResponse(result)
  } catch (err) {
    return buildFailureResponse(err)
  }
}

export default handleExecutionResult

/*
const buildObjectResponse = (statusCode, headers, body) =>
  ({ statusCode, headers, body })

const isResponseObject = result =>
  typeof result === 'object' && result.statusCode

const ensureDefaultProps = (result) => {
  const validResult = result || {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  }

  validResult.statusCode = validResult.statusCode || 200

  const addDefaultContentType = (headers) => {
    if (headers) {
      headers['Content-Type'] = 'application/json'
      return headers
    }
    return { 'Content-Type': 'application/json' }
  }

  validResult.headers = addDefaultContentType(validResult.headers)
  console.log(validResult) //eslint-disable-line
  return validResult
}

const buildSuccessResponse = result =>
  (isResponseObject(result) ? ensureDefaultProps(result) :
  buildObjectResponse(200, { 'Content-Type': 'application/json' }, result))

const buildFailureResponse = err =>
  ({ statusCode: err.statusCode || 500, body: err.message || err })

const isPromise = promise =>
  (promise && typeof promise.then === 'function')

export const handleExecutionResult = async (moduleExecutor) => {
  try {
    const result = moduleExecutor()
    if (isPromise(result)) {
      return buildSuccessResponse(await result)
    }
    return buildSuccessResponse(result)
  } catch (err) {
    return buildFailureResponse(err)
  }
}

export default handleExecutionResult
*/
