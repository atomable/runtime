/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict'

export const prepareHeaders = (headers) => {
  const newHeaders = { host: 'atomable.net' };

  Object.keys(headers).filter((h) => {
    const low = h.toLowerCase();
    return !low.startsWith('cloudf') &&
      !low.startsWith('via') &&
      !low.startsWith('x-api-key') &&
      !low.startsWith('x-for') &&
      !low.startsWith('x-at') &&
      !low.startsWith('x-amz') &&
      !low.startsWith('host');
  }).forEach((k) => {
    newHeaders[k.toLowerCase()] = headers[k];
  });

  return newHeaders;
};