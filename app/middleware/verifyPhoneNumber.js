'use strict';

module.exports = () => {
  return async function jwtErr(ctx, next) {
    const phoneNumber = ctx.request.body.phoneNumber;
    if (phoneNumber.length !== 11) {
      ctx.body = {
        code: -1,
        data: '',
        message: '手机号位数错误',
      };
      return;
    }

    const reg = /^\d{11}$/;
    if (!reg.test(phoneNumber)) {
      ctx.body = {
        code: -1,
        data: '',
        message: '手机号必须全为数字',
      };
      return;
    }

    const userData = await ctx.service.user.getUserDataByPhone(phoneNumber);

    if (!userData) { // 如果数据库中仍然没有该数据，则该手机号不存在
      ctx.body = {
        code: -1,
        data: '',
        message: '手机号不存在',
      };
      return;
    }
    await next();
  };
};
