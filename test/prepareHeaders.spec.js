/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module, describe, it */
'use strict';

import should from 'should';

import { prepareHeaders } from '../src/prepareHeaders';

describe('prepareHeaders tests', () => {
  it('always sets host to atomable.net', () => {
    prepareHeaders({}).should.eql({ host: 'atomable.net' });
  });

  it('always overrides host to atomable.net', () => {
    prepareHeaders({ HOST: 'google.com' }).should.eql({ host: 'atomable.net' });
  });

  it('normalizes to lowercase', () => {
    prepareHeaders({ AuthOrization: 'asd' }).should.eql({ authorization: 'asd', host: 'atomable.net' });
  });

  it('strips unwanted headers', () => {
    let headers = {
      cloudf: '',
      via: ''
    };
    headers['x-api-key'] = '';
    headers['x-for'] = '';
    headers['x-at'] = '';
    headers['x-amz'] = '';
    prepareHeaders(headers).should.eql({ host: 'atomable.net' });
  });
});