import * as fs from 'fs';
import * as path from 'path';

export const findConfigFiles = function (dir, filelist) {
  try {
    filelist = filelist || [];

    let files = fs.readdirSync(dir);
    files.forEach((file) => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = findConfigFiles(path.join(dir, file), filelist);
      }
      else if (file === 'atomable.yml') {
        filelist.push(path.join(dir, file));
      }
    });

    return filelist;
  } catch (err) {
    return { status: 500, message: 'failure while getting config file(s)' };
  }
};