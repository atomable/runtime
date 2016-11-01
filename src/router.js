/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

import { Maybe } from 'liftjs';
import { Result } from './result';
import { resolveModule } from './resolve-module';
import { resolveRoute } from './resolve-route';
import { validateRequiredParameters } from './validate-required-parameters';
import { buildModuleParameters } from './build-module-parameters';
import { handleExecutionResult } from './handle-execution-result';

export const router = async function (config, event, basePath) {
  return Result(resolveRoute(config, event))
    .map(route => validateRequiredParameters(route, event))
    .map(route => buildModuleParameters(route, event))
    .map(r => () => resolveModule(r.route, event, basePath)(r.params))
    .map(executor => handleExecutionResult(executor))
    .get();
};