export const buildEvent = (call) => {
  return {
    path: call.path.replace(/^\/|\/$/g, '').toLowerCase(),
    method: call.httpMethod ? null : call.httpMethod.toLowerCase(),
    parameters: {
      body: call.body,
      headers: call.headers,
      query: call.queryStringParameters
    }
  };
};