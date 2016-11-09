/* global it describe */

import should from 'should'; //eslint-disable-line

import { router } from '../dist/router';

const config = require('./mock/atomable.json');
config[0].handler = require('./mock/test.microservice');
config[1].handler = require('./mock/test-promise.microservice');

config[2].handler = config[0].handler;

describe('A router', () => {
  it('should return 404 when path not in config', () =>
    router(config, { path: '', method: 'post', parameters: {} })
      .then(res =>
        res.should.be.eql({ statusCode: 404, body: 'not found' })),
  );

  it('should return 404 when method not in config', () =>
    router(config, { path: 'test', method: 'get', parameters: {} })
      .then(res =>
        res.should.be.eql({ statusCode: 404, body: 'not found' })),
  );

  it('should return 400 when required param missing', () =>
    router(config, { path: 'test', method: 'post', parameters: {} })
      .then(res =>
        res.should.be.eql({ statusCode: 400, body: 'missing required parameter' })));

  it('should return 200 when no params needed', () =>
    router(config, { path: 'empty/really', method: 'put' })
      .then(res =>
        res.statusCode.should.be.eql(200)));

  it('should return 200 when all parameters supplied', () => {
    const parameters = { body: { bodyValue: 'body' }, query: { queryValue: 'query' }, headers: { test: true, authorization: 'asd' } };
    return router(config, { path: 'test', method: 'post', parameters })
      .then(res =>
        res.should.be.eql({
          statusCode: 200,
          body: {
            body: parameters.body.bodyValue,
            query: parameters.query.queryValue,
            headers: parameters.headers,
          },
        }));
  });

  it('should return 200 when all params supplied and method not in event', () => {
    const parameters = { body: { bodyValue: 'body' }, query: { queryValue: 'query' }, headers: { test: true, authorization: 'asd' } };
    return router(config, { path: 'test', method: undefined, parameters })
      .then(res =>
        res.should.be.eql({
          statusCode: 200,
          body: {
            body: parameters.body.bodyValue,
            query: parameters.query.queryValue,
            headers: parameters.headers,
          },
        }));
  });


  it('should return 200 when optional parameters not supplied', () => {
    const parameters = { query: { queryValue: 'query' }, headers: { test: true } };
    return router(config, { path: 'test', method: 'post', parameters })
      .then((res) => {
        res.should.be.eql({
          statusCode: 200,
          body: { body: {}, query: parameters.query.queryValue, headers: parameters.headers },
        });
      });
  });

  it('should return 200 when wildcard not supplied even if required', () => {
    const parameters = { query: { queryValue: 'query' } };
    return router(config, { path: 'test', method: 'post', parameters })
      .then(res =>
        res.should.be.eql({
          statusCode: 200,
          body: { body: {}, query: parameters.query.queryValue, headers: {} },
        }));
  });

  it('should return 200 when all parameters supplied and module returns a promise', () => {
    const parameters = { body: { bodyValue: 'body' }, query: { queryValue: 'query' }, headers: { test: true, authorization: 'asd' } };
    return router(config, { path: 'testPromise', method: 'get', parameters })
      .then(res =>
        res.should.be.eql({
          statusCode: 200,
          body: {
            body: parameters.body.bodyValue,
            query: parameters.query.queryValue,
            headers: parameters.headers,
          },
        }));
  });

  it('should return 200 when optional parameters not supplied and module returns a promise', () => {
    const parameters = { query: { queryValue: 'query' }, headers: { test: true } };
    return router(config, { path: 'testPromise', method: 'get', parameters })
      .then(res =>
        res.should.be.eql({
          statusCode: 200,
          body: {
            body: {},
            query: parameters.query.queryValue,
            headers: parameters.headers,
          },
        }));
  });
});
