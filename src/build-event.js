export const normalize = obj =>
  (obj ? obj.replace(/^\/|\/$/g, '').toLowerCase() : obj);

export const buildEvent = call => ({
  path: normalize(call.path),
  method: normalize(call.httpMethod),
  parameters: {
    body: call.body,
    headers: call.headers,
    query: call.queryStringParameters,
  },
});
