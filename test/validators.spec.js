/* global it describe */

import { runValidators } from '../dist/runValidators';

describe('run validators', () => {
  it('should run all custom validators', (done) => {
    try {
      runValidators({
        parameters: [{
          in: 'body',
          name: 'testValue',
          validators: [
            () => { },
            (value) => {
              if (!value) {
                throw new Error('string is empty');
              }
            },
          ],
        }],
      },
        {
          parameters: {
            body: {
              testValue: '',
            },
          },
        });

      done('an error should have been thrown');
    } catch (err) {
      done();
    }
  });
});
