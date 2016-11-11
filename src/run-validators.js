import { Maybe } from 'liftjs'; // eslint-disable-line

export const runValidators = (route, event) => { // eslint-disable-line
  if (route.parameters && route.parameters.length > 0) {
    route.parameters.forEach(parameter => { // eslint-disable-line
      if (parameter.validators && parameter.validators.length > 0) {
        const value =
          Maybe(event[parameter.in])
            .map(eventParam => eventParam[parameter.name])
            .or(null);

        parameter.validators.forEach(validator => validator(value));
      }
    });

    return route;
  }

  return route;
};
