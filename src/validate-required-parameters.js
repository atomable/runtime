'use strict';

import { Maybe } from 'liftjs';
import { Result } from './result';

const isRequired = routeParam =>
  Maybe(routeParam).map(value => value.required).or(true);

const isMissing = (routeParam, event) =>
  Maybe(event.params[routeParam.in])
    .map(x => x[routeParam.name])
    .map(x => false)
    .or(true);

export const validateRequiredParameters = (route, event) =>
  Maybe(route)
    .map(route => route.parameters)
    .map(parameters => parameters.some(routeParam => routeParam.name !== '*' && isRequired(routeParam) && isMissing(routeParam, event)) ? null : route)
    .or({ status: 400, message: 'missing required parameter' });