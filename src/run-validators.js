import { Maybe } from 'liftjs';

export const runValidators = (route, event) => {
  if (route.parameters && route.parameters.length > 0) {
    route.parameters.forEach(parameter => {
      if (parameter.validators && parameter.validators.length > 0) {
        const value =
          Maybe(event[parameter.in])
            .map(eventParam => eventParam[parameter.name])
            .or(null);

        parameter.validators.forEach((validator) => validator(value));
      }
    });

    return route;
  } else {
    return route;
  }
};