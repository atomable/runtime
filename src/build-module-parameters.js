'use strict';

import { Maybe } from 'liftjs';
import { Result } from './result';

export const buildModuleParameters = (route, event) => {
  return Maybe(route)
    .map(route => route.parameters)
    .map(parameters => parameters.map(routeParam => routeParam.name === '*' ?
      Maybe(event.params[routeParam.in]).or({}) :
      Maybe(event.params[routeParam.in])
        .map(x => x[routeParam.name])
        .or({})))
    .map(parameters => { return { route: route, params: parameters }; })
    .or({ route: route, params: [] });
};