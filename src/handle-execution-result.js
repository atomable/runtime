const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

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

const ensureDefaultProps = (result, defaultheaders) => {
  const validResult = Object.assign({
    statusCode: 200,
    headers: defaultheaders,
    body: '{}',
  }, result)

  return buildObjectResponse(validResult.statusCode || 200,
    Object.assign(defaultheaders, validResult.headers),
    validResult.body)
}

const buildSuccessResponse = result =>
  (isResponseObject(result)
    ? ensureDefaultProps(result, defaultHeaders)
    : buildObjectResponse(200, defaultHeaders, result))

const buildFailureResponse = err =>
  buildObjectResponse(err.statusCode || 500, defaultHeaders, err.message || err)

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
