export const buildEvent = (call) => {
  return {
    path: call.path.replace(/^\/|\/$/g, '').toLowerCase(),
    method: call.httpMethod !== undefined ? call.httpMethod.toLowerCase() : undefined,
    parameters: {
      body: call.body,
      headers: call.headers,
      query: call.query
    }
  };
};