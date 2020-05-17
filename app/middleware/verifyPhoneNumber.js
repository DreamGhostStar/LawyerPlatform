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

    const userData = await ctx.model.User.User.findOne({
      where: {
        phone_number: phoneNumber,
      },
      attributes: [ 'id', 'phone_number', 'password' ],
    });

    if (!userData) { // 如果数据库中仍然没有该数据，则该手机号不存在
      ctx.body = {
        code: -1,
        data: '',
        message: '手机号不存在',
      };
      return;
    }

    await ctx.service.cache.set('user', userData, 60 * 60);
    await next();
  };
};
