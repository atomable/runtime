import { Maybe } from 'liftjs';
import { Result } from './result';

export const resolveModule = (route, parameters) => {
  try {
    return Maybe(route)
      .map(route => require(route.basePath + route.handler))
      .else(Result({ status: 404, message: 'module not found' }))
      .map(module => { return { module, parameters } })
      .get();
  } catch (err) {
    return route ? { status: 500, message: err } : { status: 404, message: 'not found' };
  }
};