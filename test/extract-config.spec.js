import should from 'should';

import { extractConfig } from '../dist/extract-config';

describe('extract config', () => {
  it('returns the config in the correct format', () => {
    extractConfig(__dirname + '\\mock\\normal\\atomable.yml').should.eql(
      {
        microservice: 'test',
        handler: 'test.microservice',
        basePath: __dirname + '\\mock\\normal\\',
        https: [
          {
            path: 'test',
            method: 'post',
            parameters: [
              {
                in: 'body',
                name: 'bodyValue',
                required: false
              },
              {
                in: 'query',
                name: 'queryValue'
              },
              {
                in: 'headers',
                name: '*',
                required: true
              }
            ]
          },
          {
            path: 'other',
            method: 'get',
            parameters: [
              {
                in: 'body',
                name: 'bodyValue'
              }
            ]
          }
        ]
      });
  });
});