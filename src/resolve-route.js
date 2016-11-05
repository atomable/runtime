import { Maybe } from 'liftjs';
import { Result } from './result';

const routeMatchesEvent = (route, event) =>
  route.path.toLowerCase() === event.path.toLowerCase() &&
    route.method.toLowerCase() === event.method.toLowerCase();

export const resolveRoute = (configs, event) => {
  const config = configs.filter(config => {
    return Maybe(config.https)
      .map(route => routeMatchesEvent(route, event))
      .or(false);
  });

  if (config.length === 0) {
    return { status: 404, message: 'not found' };
  } else if (config.length > 1) {
    return { status: 500, message: 'multiple routes matched' };
  }

  const matchedConfig = config[0];
  const matchedRoute = matchedConfig.https;

  return Object.assign({ handler: matchedConfig.handler, basePath: matchedConfig.basePath, }, matchedRoute);
};