import { Maybe } from 'liftjs'; // eslint-disable-line

const routeMatchesEvent = (route, event) =>
  (route.path.toLowerCase() === event.path.toLowerCase()
    && (event.method === undefined || route.method.toLowerCase() === event.method.toLowerCase()));

export const resolveRoute = (configs, event) => { // eslint-disable-line
  const config =
    configs.filter(config => // eslint-disable-line
      Maybe(config.https)
        .map(route => routeMatchesEvent(route, event))
        .or(false));

  if (config.length === 0) {
    return { statusCode: 404, body: 'not found' };
  }

  if (config.length > 1) {
    return { statusCode: 500, body: 'multiple routes matched' };
  }

  const matchedConfig = config[0];

  return Object.assign({ handler: matchedConfig.handler }, matchedConfig.https);
};
