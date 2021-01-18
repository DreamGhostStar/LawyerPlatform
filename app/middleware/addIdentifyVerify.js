'use strict';

module.exports = () => {
  return async function addIdentifyVerify(ctx, next) {
    let query;
    if (JSON.stringify(ctx.query) === "{}") {
      query = ctx.request.body
    } else {
      query = ctx.query
    }
    if (!query) {
      ctx.body = ctx.retrunInfo(-1, '', '参数未传递，不能验证身份证号')
      return;
    }
    if (!query.identifyNumber) {
      ctx.body = ctx.retrunInfo(-1, '', '身份证号不能为空，无法进行验证')
      return;
    }
    const { identifyNumber } = query
    const verifyResult = await ctx.service.user.userUtil.verifyIdentify(identifyNumber)
    if (!verifyResult) {
      ctx.body = ctx.retrunInfo(-1, '', '身份证号已存在')
      return;
    }
    await next();
  };
};
