'use strict';

module.exports = () => {
  return async function jwtErr(ctx, next) {
    const lawID = ctx.request.body.id || ctx.request.body.law_id;

    if (!lawID) {
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
      return;
    }

    const law = await ctx.service.law.lawUtil.getLawByID(parseInt(lawID));
    if (!law) {
      ctx.body = ctx.retrunInfo(-1, '', '案件不存在');
      return;
    }
    await next();
  };
};
