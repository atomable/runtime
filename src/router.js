/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

import { Maybe } from 'liftjs';
import { Result } from './result';
import { resolveModule } from './resolveModule';
import { resolveRoute } from './resolveRoute';
import { validateRequiredParameters } from './validateRequiredParameters';
import { buildModuleParameters } from './buildModuleParameters';
import { handleExecutionResult } from './handleExecutionResult';

export const router = async (config, event, basePath) => {
  return Result(resolveRoute(config, event))
    .map(route => validateRequiredParameters(route, event))
    .map(route => buildModuleParameters(route, event))
    .map(r => () => resolveModule(r.route, event, basePath)(r.params))
    .map(executor => handleExecutionResult(executor))
    .get();
};