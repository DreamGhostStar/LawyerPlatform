'use strict';

module.exports = () => {
  return async function jwtErr(ctx, next) {
    const logID = ctx.request.body.log_id;

    if (!logID) {
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
      return;
    }

    const log = await ctx.service.log.getLogByID(parseInt(logID));
    if (!log) {
      ctx.body = ctx.retrunInfo(-1, '', '日志不存在');
      return;
    }
    if (!log.is_alter) {
      ctx.body = ctx.retrunInfo(-1, '', '该日志不允许被删除或修改');
      return;
    }
    await next();
  };
};
