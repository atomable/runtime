import { Maybe } from 'liftjs'; // eslint-disable-line
import { Result } from './result';
import { resolveRoute } from './resolve-route';
import { validateRequiredParameters } from './validate-required-parameters';
import { runValidators } from './run-validators';
import { buildModuleParameters } from './build-module-parameters';
import { handleExecutionResult } from './handle-execution-result';

export const router = async (configs, event) => // eslint-disable-line
  Result(resolveRoute(configs, event))
    .map(route => validateRequiredParameters(route, event))
    .map(route => runValidators(route, event))
    .map(route => buildModuleParameters(route, event))
    .map(res => handleExecutionResult(() => res.route.handler(...res.parameters)))
    .get();

