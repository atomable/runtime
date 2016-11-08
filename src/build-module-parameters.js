import { Maybe } from 'liftjs';

export const buildModuleParameters = (route, event) => {
  return Maybe(route)
    .map(route => route.parameters)
    .map(parameters => parameters.map(routeParam => routeParam.name === '*' ?
      Maybe(event.parameters[routeParam.in]).or({}) :
      Maybe(event.parameters[routeParam.in])
        .map(x => x[routeParam.name])
        .or({})))
    .map(parameters => { return { route, parameters }; })
    .or({ route, parameters: [] });
};