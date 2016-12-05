const buildObjectResponse = (statusCode, headers, body) =>
  ({ statusCode, headers, body: sanitizeBody(body) })

const isObject = result =>
  typeof result === 'object'

const isString = result =>
  typeof result === 'string'

const isResponseObject = result =>
  isObject(result) && result.statusCode

const sanitizeBody = body =>
  (isString(body) ? body : JSON.stringify(body))

const ensureDefaultProps = (result) => {
  const validResult = result || {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{}',
  }

  validResult.statusCode = validResult.statusCode || 200
  validResult.headers = Object.assign({ 'Content-Type': 'application/json' }, validResult.headers)
  validResult.body = sanitizeBody(validResult.body)

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
