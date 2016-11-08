import { Maybe } from 'liftjs';
import { Result } from './result';

const routeMatchesEvent = (route, event) =>
  route.path.toLowerCase() === event.path.toLowerCase() &&
    (event.method === undefined ? true : route.method.toLowerCase() === event.method.toLowerCase());

export const resolveRoute = (configs, event) => {
  const config = configs.filter(config => {
    return Maybe(config.https)
      .map(route => routeMatchesEvent(route, event))
      .or(false);
  });

  if (config.length === 0) {
    return { statusCode: 404, body: 'not found' };
  } else if (config.length > 1) {
    return { statusCode: 500, body: 'multiple routes matched' };
  }

  const matchedConfig = config[0];

  return Object.assign({ handler: matchedConfig.handler }, matchedConfig.https);
};