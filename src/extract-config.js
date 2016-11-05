import * as fs from 'fs';
import * as yaml from 'js-yaml';

export const extractConfig = (filePath) => {
  try {
    const rawConfig = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    return Object.assign({ basePath: filePath.replace(/[^\\\/]*$/, '') }, rawConfig); // TODO: transform the path and method to lowercase
  } catch (err) {
    return { status: 500, message: 'error while parsing config file(s)' };
  }
};