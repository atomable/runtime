export const buildEvent = (call) => {
  return {
    path: normalize(call.path),
    method: normalize(call.httpMethod),
    parameters: {
      body: call.body,
      headers: call.headers,
      query: call.queryStringParameters
    }
  };
};

export const normalize = (obj) => { 
  return obj ? obj.replace(/^\/|\/$/g, '').toLowerCase() : obj;
};