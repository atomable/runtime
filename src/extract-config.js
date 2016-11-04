import * as fs from 'fs';
import * as yaml from 'js-yaml';

export const extractConfig = (filePath) => {
  try {
    const rawConfig = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    return rawConfig.https.map(route => {
      return {
        handler: rawConfig.handler,
        basePath: filePath.replace(/[^\\\/]*$/, ''),
        path: route.path,
        method: route.method,
        parameters: route.parameters
      };
    });
  } catch (err) {
    return { status: 500, message: 'error while parsing config file(s)' };
  }
};