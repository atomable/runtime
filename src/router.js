import { Maybe } from 'liftjs';
import { Result } from './result';
import { resolveModule } from './resolve-module';
import { resolveRoute } from './resolve-route';
import { validateRequiredParameters } from './validate-required-parameters';
import { buildModuleParameters } from './build-module-parameters';
import { handleExecutionResult } from './handle-execution-result';

export const router = async function (configs, event) {
  return Result(resolveRoute(configs, event))
    .map(route => validateRequiredParameters(route, event))
    .map(route => buildModuleParameters(route, event))
    .map(res => handleExecutionResult(() => res.route.handler(...res.parameters)))
    .get();
};