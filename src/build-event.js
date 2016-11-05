export const buildEvent = (call) => {
  return {
    path: call.path.replace(/^\/|\/$/g, '').toLowerCase(), // remove first and last slash
    method: call.method.toLowerCase(),
    parameters: {
      body: call.body,
      headers: call.headers,
      query: call.query
    }
  };
};