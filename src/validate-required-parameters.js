import { Maybe } from 'liftjs';
import { Result } from './result';

const isRequired = routeParam =>
  Maybe(routeParam).map(value => value.required).or(true);

const isMissing = (routeParam, event) =>
  Maybe(event.parameters[routeParam.in])
    .map(x => x[routeParam.name])
    .map(x => false)
    .or(true);

export const validateRequiredParameters = (route, event) =>
  Maybe(route)
    .map(route => route.parameters)
    .else(Maybe({}))
    .map(parameters => parameters.length > 0 && parameters.some(routeParam => routeParam.name !== '*' && isRequired(routeParam) && isMissing(routeParam, event)) ? null : route)
    .or({ statusCode: 400, body: 'missing required parameter' });