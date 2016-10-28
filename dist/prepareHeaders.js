/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prepareHeaders = exports.prepareHeaders = function prepareHeaders(headers) {
  var newHeaders = { host: 'atomable.net' };

  Object.keys(headers).filter(function (h) {
    var low = h.toLowerCase();
    return !low.startsWith('cloudf') && !low.startsWith('via') && !low.startsWith('x-api-key') && !low.startsWith('x-for') && !low.startsWith('x-at') && !low.startsWith('x-amz') && !low.startsWith('host');
  }).forEach(function (k) {
    newHeaders[k.toLowerCase()] = headers[k];
  });

  return newHeaders;
};