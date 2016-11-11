import { Maybe } from 'liftjs'; // eslint-disable-line

export const buildModuleParameters = (route, event) => // eslint-disable-line
  Maybe(route)
    .map(route => route.parameters) // eslint-disable-line
    .map(parameters =>
      parameters.map(routeParam => (routeParam.name === '*'
        ? Maybe(event.parameters[routeParam.in]).or({})
        : Maybe(event.parameters[routeParam.in])
          .map(x => x[routeParam.name])
          .or({}))))
    .map(parameters => ({ route, parameters }))
    .or({ route, parameters: [] });
