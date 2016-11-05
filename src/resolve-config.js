import { Maybe } from 'liftjs';
import { Result } from './result';

export const resolveConfig = (configs, event) => {
  const config = configs.filter(config => { 
    return Maybe(config.https)
      .map(routes => routes.some(route => route.path === event.path && route.method === event.method))
      .or(false);
  });

  if (config.length === 0) {
    return { status: 404, message: 'route not configured' };
  } else if (config.length > 1) {
    return { status: 500, message: 'multiple routes matched' };
  }

  return config[0];
};