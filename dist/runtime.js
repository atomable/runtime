'use strict';var _router=require('./router');var _buildEvent=require('./build-event');module.exports.main=function(call,context,callback){var basePath='./project/';(0,_router.router)('',(0,_buildEvent.buildEvent)(call),basePath).then(function(res){return callback(null,res)}).catch(function(res){return callback(null,res)})};
//# sourceMappingURL=runtime.js.map