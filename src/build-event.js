'use strict';

export const buildEvent = (call) => {
  return {
    path: call.path,
    method: call.method,
    params: {
      body: call.body,
      headers: call.headers,
      query: call.query
    }
  };
};