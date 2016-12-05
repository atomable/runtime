/* global it describe */

import should from 'should'; //eslint-disable-line

import { register, handle } from '../dist/runtime';

describe('A runtime', () => {
  it('should return error when no config is present', (done) => {
    handle({ path: 'proton/electron', httpMethod: 'post', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({ statusCode: 404, body: 'no routes are configured' });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should run func', (done) => {
    register(() =>
      'hello world',
      {
        name: 'proton',
        https: {
          path: '/proton/electron/',
          method: 'post',
        },
      });

    handle({ path: 'proton/electron', httpMethod: 'post', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: 'hello world',
        });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should return OK when nothing is returned from module', (done) => {
    register(() => { },
      {
        name: 'empty',
        https: {
          path: '/empty',
          method: 'get',
        },
      });

    handle({ path: 'empty', httpMethod: 'get', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: undefined,
        });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should return error when module throws', (done) => {
    register(() => {
      throw new Error('this exploded');
    },
      {
        name: 'explosion',
        https: {
          path: 'throw',
          method: 'get',
        },
      });

    handle({ path: 'throw', httpMethod: 'get', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({
          statusCode: 500,
          body: 'this exploded',
        });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should use module\'s status code when returned', (done) => {
    register(() =>
      ({ statusCode: 403, body: 'unauthorized' }),
      {
        name: 'unauthorized',
        https: {
          path: 'unauthorized',
          method: 'get',
        },
      });

    handle({ path: 'unauthorized', httpMethod: 'get', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({
          statusCode: 403,
          headers: { 'Content-Type': 'application/json' },
          body: 'unauthorized',
        });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should use module\'s status code when thrown', (done) => {
    register(() => { throw { statusCode: 401, message: 'forbidden', } }, // eslint-disable-line
      {
        name: 'forbidden',
        https: {
          path: 'forbidden',
          method: 'get',
        },
      });

    handle({ path: 'forbidden', httpMethod: 'get', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({
          statusCode: 401,
          body: 'forbidden',
        });
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
