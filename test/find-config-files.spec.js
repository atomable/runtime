import should from 'should';

import { findConfigFiles } from '../dist/find-config-files';

describe('find config files', () => {
  it('returns all files recursively', () => {
    const expectedFiles = [
      'runtime\\test\\mock\\nested\\level2\\atomable.yml',
      'runtime\\test\\mock\\normal\\atomable.yml',
      'runtime\\test\\mock\\promise\\atomable.yml'];
    
    const files = findConfigFiles(__dirname + '/mock');
    
    if (!files.every(file => expectedFiles.some(expected => file.indexOf(expected) >= 0))) {
      should.fail('not all files were found');
    }
  });

  it('returns nothing when no files match', () => {    
    findConfigFiles(__dirname + '/mock/empty').should.eql([]);
  });

  it('returns a 500 when file system error', () => {    
    findConfigFiles(__dirname + '/mockasda').should.eql({ status: 500, message: 'failure while getting config file(s)' });
  });
});