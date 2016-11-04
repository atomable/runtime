import should from 'should';

import { mergeConfigs } from '../dist/merge-configs';
import { extractConfig } from '../dist/extract-config';

describe('merge config', () => {
  it('returns all the configs merged together', () => {
    mergeConfigs([extractConfig(__dirname + '\\mock\\normal\\atomable.yml'), extractConfig(__dirname + '\\mock\\promise\\atomable.yml')]).should.eql(
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
        ,
        {
          handler: 'test-promise.microservice',
          basePath: __dirname + '\\mock\\promise\\',
          path: 'testPromise',
          method: 'get',
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
        }
        ,
        {
          handler: 'test-promise.microservice',
          basePath: __dirname + '\\mock\\promise\\',
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
    );
  });
});