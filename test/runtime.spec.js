import { should } from 'should';

import { register, handle } from '../dist/runtime';

describe('A runtime', () => {
  it('should should run func', () => {
    register(() => {
      return 'hello world';
    }, {
        "name": "proton",
        "handler": "proton.proton",
        "https": {
          "path": "proton",
          "method": "get"
        }
      });
    handle({ path: 'proton', method: 'post', parameters: {} }, {}, (error, data) => {
      data.should.equal('hello world');
    });
  });
});