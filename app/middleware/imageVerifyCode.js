'use strict';

module.exports = () => {
  return async function jwtErr(ctx, next) {
    const sessionVerifyCode = ctx.session.imageVerifyCode;

    if (!sessionVerifyCode) {
      ctx.body = {
        code: -1,
        data: '',
        message: '验证码已失效',
      };
      return;
    }

    const verifyCode = ctx.request.body.verification_code;
    if (verifyCode.length !== 6) {
      ctx.body = {
        code: -1,
        data: '',
        message: '验证码错误',
      };
      return;
    }

    if (verifyCode.toLowerCase() !== sessionVerifyCode.toLowerCase()) {
      ctx.body = {
        code: -1,
        data: '',
        message: '验证码错误',
      };
      return;
    }
    await next();
  };
};
