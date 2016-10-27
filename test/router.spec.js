/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module, describe, it */
'use strict';

import should from 'should';

import { router } from '../src/router';
import { resolveModule } from '../src/resolveModule';

const config = require('./atomable.json');

describe('router tests', () => {
  it('should return 404 when path not in config', () => {
    return router(config, { path: '/', method: 'POST', params: {} }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 404, message: 'not found' });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });

  it('should return 404 when method not in config', () => {
    return router(config, { path: '/test', method: 'GET', params: {} }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 404, message: 'not found' });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });

  it('should return 400 when required param missing', () => {
    return router(config, { path: '/test', method: 'POST', params: {} }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 400, message: 'missing required parameter' });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });

  it('should return 200 when all params supplied', () => {
    const params = { body: { bodyValue: "body" }, query: { queryValue: "query" }, headers: { test: true, authorization: "asd" } };
    return router(config, { path: '/test', method: 'POST', params: params }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: params.body.bodyValue, query: params.query.queryValue, headers: params.headers } });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });

  it('should return 200 when optional params not supplied', () => {
    const params = { query: { queryValue: "query" }, headers: { test: true } };
    return router(config, { path: '/test', method: 'POST', params: params }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: params.query.queryValue, headers: params.headers } });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });

  it('should return 200 when wildcard not supplied even if required', () => {
    const params = { query: { queryValue: "query" } };
    return router(config, { path: '/test', method: 'POST', params: params }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: params.query.queryValue, headers: {} } });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });

  it('should return 200 when all params supplied and module returns a promise', () => {
    const params = { body: { bodyValue: "body" }, query: { queryValue: "query" }, headers: { test: true, authorization: "asd" } };
    return router(config, { path: '/testPromise', method: 'GET', params: params }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: params.body.bodyValue, query: params.query.queryValue, headers: params.headers } });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });

  it('should return 200 when optional params not supplied and module returns a promise', () => {
    const params = { query: { queryValue: "query" }, headers: { test: true } };
    return router(config, { path: '/testPromise', method: 'GET', params: params }, '../test/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: params.query.queryValue, headers: params.headers } });
      })
      .catch(err => {
        should.fail(err, {}, "this should not fail");
      });
  });
});