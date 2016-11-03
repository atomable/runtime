import { Maybe } from 'liftjs';
import { Result } from './result';

export const resolveModule = (method, params, basePath) => {
  try {
    return Maybe(method)
      .map(method => require(basePath + method.module))
      .else(Result({ status: 404, message: 'module not found' }))
      .map(module => { return { module, params } })
      .get();
  } catch (err) {
    return method ? { status: 500, message: 'unknown error occured' } : { status: 404, message: 'not found' };
  }
};