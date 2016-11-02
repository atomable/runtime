/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module, describe, it */
'use strict';

import should from 'should';

import { buildModuleParameters } from '../dist/build-module-parameters';

describe('build parameters tests', () => {
  it('returns param if exists', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: 'val' }] }, { method: 'GET', params: { body: { val: 'test' } } }).params.should.eql(['test']);
  });

  it('returns multiple params if exists', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: 'val' }, { in: 'headers', name: 'authorization' }] }, { method: 'GET', params: { body: { val: 'test' }, headers: { authorization: 123 } } }).params.should.eql(['test', 123]);
  });

  it('returns all objects if wildcard', () => {
    buildModuleParameters({ parameters: [{ in: 'headers', name: '*' }] }, { method: 'GET', params: { headers: { test: true, value: "asd" } } }).params.should.eql([{ test: true, value: 'asd' }]);
  });

  it('returns empty object if not exist and optional', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: 'test', required: false }] }, { method: 'GET', params: {} }).params.should.eql([{}]);
  });

  it('returns empty object if not exist, wildcard and optional', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: '*', required: false }] }, { method: 'GET', params: {} }).params.should.eql([{}]);
  });

  it('returns empty object if not exist, wildcard and required', () => {
    buildModuleParameters({ parameters: [{ in: 'body', name: '*', required: true }] }, { method: 'GET', params: {} }).params.should.eql([{}]);
  });
});