'use strict';

module.exports = () => {
  return async function addQualificationsNumber(ctx, next) {
    let query;
    if (JSON.stringify(ctx.query) === "{}") {
      query = ctx.request.body
    } else {
      query = ctx.query
    }
    if (!query) {
      ctx.body = ctx.retrunInfo(-1, '', '参数未传递，不能验证律师资格证号')
      return;
    }
    if (!query.qualificationsNumber) {
      ctx.body = ctx.retrunInfo(-1, '', '律师资格证号不能为空，无法进行验证')
      return;
    }
    const { qualificationsNumber } = query
    const verifyResult = await ctx.service.user.userUtil.verifyQualificationsNumber(qualificationsNumber)
    if (!verifyResult) {
      ctx.body = ctx.retrunInfo(-1, '', '律师资格证号已存在')
      return;
    }
    await next();
  };
};
