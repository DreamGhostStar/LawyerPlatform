'use strict';

module.exports = () => {
  return async function noteVerifyCode(ctx, next) {
    const sessionVerifyCode = ctx.session.noteVerifyCode;
    console.log('-------短信登录-----')
    console.log(ctx.session.noteVerifyCode)

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
    await next();
  };
};
