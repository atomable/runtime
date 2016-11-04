import should from 'should';

import { extractConfig } from '../dist/extract-config';

describe('extract config', () => {
  it('returns the config in the correct format', () => {
    extractConfig(__dirname + '\\mock\\normal\\atomable.yml').should.eql(
      [
        {
          handler: 'test.microservice',
          basePath: __dirname + '\\mock\\normal\\',
          path: 'test',
          method: 'post',
          parameters: [
            {
              in: 'query',
              name: 'queryValue'
            },
            {
              in: 'body',
              name: 'bodyValue',
              required: false
            },
            {
              in: 'headers',
              name: '*',
              required: true
            }
          ]
        },
        {
          handler: 'test.microservice',
          basePath: __dirname + '\\mock\\normal\\',
          path: 'other',
          method: 'get',
          parameters: [
            {
              in: 'body',
              name: 'bodyValue'
            }
          ]
        }
      ]);
  });
});