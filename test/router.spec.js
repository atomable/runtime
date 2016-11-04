import { should } from 'should';

import { router } from '../dist/router';

const config = require('./mock/atomable.json');

describe('router tests', () => {
  it('should return 404 when path not in config', () => {
    return router(config, { path: '/', method: 'POST', params: {} }, __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 404, message: 'not found' });
      });
  });

  it('should return 404 when method not in config', () => {
    return router(config, { path: '/test', method: 'GET', params: {} },  __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 404, message: 'not found' });
      })
  });

  it('should return 400 when required param missing', () => {
    return router(config, { path: '/test', method: 'POST', params: {} },  __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 400, message: 'missing required parameter' });
      })
  });

  it('should return 200 when all params supplied', () => {
    const params = { body: { bodyValue: "body" }, query: { queryValue: "query" }, headers: { test: true, authorization: "asd" } };
    return router(config, { path: '/test', method: 'POST', params: params },  __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: params.body.bodyValue, query: params.query.queryValue, headers: params.headers } });
      })
  });

  it('should return 200 when optional params not supplied', () => {
    const params = { query: { queryValue: "query" }, headers: { test: true } };
    return router(config, { path: '/test', method: 'POST', params: params },  __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: params.query.queryValue, headers: params.headers } });
      })
  });

  it('should return 200 when wildcard not supplied even if required', () => {
    const params = { query: { queryValue: "query" } };
    return router(config, { path: '/test', method: 'POST', params: params },  __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: params.query.queryValue, headers: {} } });
      })
  });

  it('should return 200 when all params supplied and module returns a promise', () => {
    const params = { body: { bodyValue: "body" }, query: { queryValue: "query" }, headers: { test: true, authorization: "asd" } };
    return router(config, { path: '/testPromise', method: 'GET', params: params }, __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: params.body.bodyValue, query: params.query.queryValue, headers: params.headers } });
      })
  });

  it('should return 200 when optional params not supplied and module returns a promise', () => {
    const params = { query: { queryValue: "query" }, headers: { test: true } };
    return router(config, { path: '/testPromise', method: 'GET', params: params },  __dirname + '/mock/')
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: params.query.queryValue, headers: params.headers } });
      })
  });
});