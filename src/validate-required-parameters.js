import { Maybe } from 'liftjs'; // eslint-disable-line

const isRequired = routeParam =>
  Maybe(routeParam).map(value => value.required).or(true);

const isMissing = (routeParam, event) =>
  Maybe(event.parameters[routeParam.in])
    .map(param => param[routeParam.name])
    .map(() => false)
    .or(true);

export const validateRequiredParameters = (route, event) => // eslint-disable-line
  Maybe(route)
    .map(route => route.parameters) // eslint-disable-line
    .else(Maybe({}))
    .map(parameters => (parameters.length > 0 && parameters.some(routeParam => routeParam.name !== '*' && isRequired(routeParam) && isMissing(routeParam, event)) ? null : route))
    .or({ statusCode: 400, body: 'missing required parameter' });
