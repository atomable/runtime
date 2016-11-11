/* global it describe */

import should from 'should'; //eslint-disable-line

import { buildModuleParameters } from '../dist/buildModuleParameters';

describe('build module parameters', () => {
  it('should return param if exists', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: 'val' }] }, { method: 'GET', parameters: { body: { val: 'test' } } }).parameters.should.eql(['test']);
  });

  it('should return multiple parameters if exists', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: 'val' }, { in: 'headers', name: 'authorization' }] }, { method: 'GET', parameters: { body: { val: 'test' }, headers: { authorization: 123 } } }).parameters.should.eql(['test', 123]);
  });

  it('should return all objects if wildcard', () => {
    buildModuleParameters({ parameters: [{ in: 'headers', name: '*' }] }, { method: 'GET', parameters: { headers: { test: true, value: 'asd' } } }).parameters.should.eql([{ test: true, value: 'asd' }]);
  });

  it('should return empty object if not exist and optional', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: 'test', required: false }] }, { method: 'GET', parameters: {} }).parameters.should.eql([{}]);
  });

  it('should return empty object if not exist, wildcard and optional', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: '*', required: false }] }, { method: 'GET', parameters: {} }).parameters.should.eql([{}]);
  });

  it('should return empty object if not exist, wildcard and required', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: '*', required: true }] }, { method: 'GET', parameters: {} }).parameters.should.eql([{}]);
  });
});
