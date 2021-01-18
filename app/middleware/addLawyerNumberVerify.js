'use strict';

module.exports = () => {
  return async function addLawyerNumberVerify(ctx, next) {
    let query;
    if (JSON.stringify(ctx.query) === "{}") {
      query = ctx.request.body
    } else {
      query = ctx.query
    }
    if (!query) {
      ctx.body = ctx.retrunInfo(-1, '', '参数未传递，不能验证律师证号')
      return;
    }
    if (!query.lawyerNumber) {
      ctx.body = ctx.retrunInfo(-1, '', '律师证号不能为空，无法进行验证')
      return;
    }
    const { lawyerNumber } = query
    const verifyResult = await ctx.service.user.userUtil.verifyLawyerNumber(lawyerNumber)
    if (!verifyResult) {
      ctx.body = ctx.retrunInfo(-1, '', '律师证号已存在')
      return;
    }
    await next();
  };
};
