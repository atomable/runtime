import { should } from 'should';

import { router } from '../dist/router';
import { extractConfig } from '../dist/extract-config';
import { mergeConfigs } from '../dist/merge-configs';

const normalConfig = extractConfig(__dirname + '\\mock\\normal\\atomable.yml');
const promiseConfig = extractConfig(__dirname + '\\mock\\promise\\atomable.yml');
const config = mergeConfigs([normalConfig, promiseConfig]);

describe('router tests', () => {
  it('should return 404 when path not in config', () => {
    return router(config, { path: '', method: 'post', parameters: {} })
      .then(res => {
        res.should.be.eql({ status: 404, message: 'not found' });
      });
  });

  it('should return 404 when method not in config', () => {
    return router(config, { path: 'test', method: 'get', parameters: {} })
      .then(res => {
        res.should.be.eql({ status: 404, message: 'not found' });
      })
  });

  it('should return 400 when required param missing', () => {
    return router(config, { path: 'test', method: 'post', parameters: {} })
      .then(res => {
        res.should.be.eql({ status: 400, message: 'missing required parameter' });
      })
  });

  it('should return 200 when all parameters supplied', () => {
    const parameters = { body: { bodyValue: "body" }, query: { queryValue: "query" }, headers: { test: true, authorization: "asd" } };
    return router(config, { path: 'test', method: 'post', parameters })
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: parameters.body.bodyValue, query: parameters.query.queryValue, headers: parameters.headers } });
      })
  });

  it('should return 200 when optional parameters not supplied', () => {
    const parameters = { query: { queryValue: "query" }, headers: { test: true } };
    return router(config, { path: 'test', method: 'post', parameters })
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: parameters.query.queryValue, headers: parameters.headers } });
      })
  });

  it('should return 200 when wildcard not supplied even if required', () => {
    const parameters = { query: { queryValue: "query" } };
    return router(config, { path: 'test', method: 'post', parameters })
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: parameters.query.queryValue, headers: {} } });
      })
  });

  it('should return 200 when all parameters supplied and module returns a promise', () => {
    const parameters = { body: { bodyValue: "body" }, query: { queryValue: "query" }, headers: { test: true, authorization: "asd" } };
    return router(config, { path: 'testPromise', method: 'get', parameters })
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: parameters.body.bodyValue, query: parameters.query.queryValue, headers: parameters.headers } });
      })
  });

  it('should return 200 when optional parameters not supplied and module returns a promise', () => {
    const parameters = { query: { queryValue: "query" }, headers: { test: true } };
    return router(config, { path: 'testPromise', method: 'get', parameters })
      .then(res => {
        res.should.be.eql({ status: 200, result: { body: {}, query: parameters.query.queryValue, headers: parameters.headers } });
      })
  });
});