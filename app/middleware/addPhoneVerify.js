'use strict';

module.exports = () => {
  return async function phoneVerify(ctx, next) {
    let query;
    if (JSON.stringify(ctx.query) === "{}") {
      query = ctx.request.body
    } else {
      query = ctx.query
    }
    if (!query) {
      ctx.body = ctx.retrunInfo(-1, '', '参数未传递，不能验证手机号')
      return;
    }
    if (!query.phone) {
      ctx.body = ctx.retrunInfo(-1, '', '电话不能为空，无法进行验证')
      return;
    }
    const { phone } = query
    const phoneVerifyResult = await ctx.service.user.userUtil.verifyPhone(phone)
    if (!phoneVerifyResult) {
      ctx.body = ctx.retrunInfo(-1, '', '电话已存在')
      return;
    }
    await next();
  };
};
