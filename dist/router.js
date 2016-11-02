'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.router=undefined;var _liftjs=require('liftjs');var _result=require('./result');var _resolveModule=require('./resolve-module');var _resolveRoute=require('./resolve-route');var _validateRequiredParameters=require('./validate-required-parameters');var _buildModuleParameters=require('./build-module-parameters');var _handleExecutionResult=require('./handle-execution-result');var router=exports.router=function _callee(config,event,basePath){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt('return',(0,_result.Result)((0,_resolveRoute.resolveRoute)(config,event)).map(function(route){return(0,_validateRequiredParameters.validateRequiredParameters)(route,event)}).map(function(route){return(0,_buildModuleParameters.buildModuleParameters)(route,event)}).map(function(r){return function(){return(0,_resolveModule.resolveModule)(r.route,event,basePath)(r.params)}}).map(function(executor){return(0,_handleExecutionResult.handleExecutionResult)(executor)}).get());case 1:case'end':return _context.stop();}}},null,this)};
//# sourceMappingURL=router.js.map