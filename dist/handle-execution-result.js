'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.handleExecutionResult=undefined;var _result=require('./result');var isPromise=function isPromise(obj){return typeof obj!=='undefined'&&typeof obj.then==='function'};var buildSuccessResponse=function buildSuccessResponse(result){return{status:200,result:result}};var buildFailureResponse=function buildFailureResponse(err){return{status:err.status||500,message:err.message||err}};var handleExecutionResult=exports.handleExecutionResult=function _callee(moduleExecutor){var result;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:result=moduleExecutor();if(!isPromise(result)){_context.next=8;break}_context.next=4;return regeneratorRuntime.awrap(result);case 4:_context.t0=_context.sent;return _context.abrupt('return',buildSuccessResponse(_context.t0));case 8:return _context.abrupt('return',buildSuccessResponse(result));case 9:case'end':return _context.stop();}}},null,undefined)};
//# sourceMappingURL=handle-execution-result.js.map