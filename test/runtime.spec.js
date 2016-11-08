import { should } from 'should';

import { register, handle } from '../dist/runtime';

describe('A runtime', () => {
  it('should return error when no config is present', (done) => {
    handle({ path: 'proton/electron', httpMethod: 'post', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({ statusCode: 404, message: 'no routes are configured' });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should run func', (done) => {
    register(() => {
      return 'hello world';
    }, {
        "name": "proton",
        "https": {
          "path": "/proton/electron/",
          "method": "post"
        }
      });

    handle({ path: 'proton/electron', httpMethod: 'post', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({ statusCode: 200, result: 'hello world' });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should return error when module throws', (done) => {
    register(() => {
      throw new Error('this exploded');
    }, {
        "name": "explosion",
        "https": {
          "path": "throw",
          "method": "get"
        }
      });

    handle({ path: 'throw', httpMethod: 'get', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({ statusCode: 500, message: 'this exploded' });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should use module\'s status code when returned', (done) => {
    register(() => {
      return { statusCode: 403, message: 'unauthorized' };
    }, {
        "name": "unauthorized",
        "https": {
          "path": "unauthorized",
          "method": "get"
        }
      });

    handle({ path: 'unauthorized', httpMethod: 'get', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({ statusCode: 403, message: 'unauthorized' });
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should use module\'s status code when thrown', (done) => {
    register(() => {
      throw { statusCode: 401, message: 'forbidden' };
    }, {
        "name": "forbidden",
        "https": {
          "path": "forbidden",
          "method": "get"
        }
      });

    handle({ path: 'forbidden', httpMethod: 'get', parameters: {} }, {}, (error, data) => {
      try {
        data.should.be.eql({ statusCode: 401, message: 'forbidden' });
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});