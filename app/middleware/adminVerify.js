'use strict';

module.exports = options => {
  return async function adminVerify(ctx, next) {
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    if (token) {
      try {
        // 解码token
        const decode = ctx.app.jwt.verify(token, options.secret);
        if (!decode.userID) {
          ctx.body = {
            code: -1,
            data: '',
            message: 'token错误',
          };
          return;
        }

        const result = await ctx.service.user.userUtil.isAdmin(decode.userID);
        if (!result.res) {
          ctx.body = {
            code: -1,
            data: '',
            message: result.message,
          };
          return;
        }

        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          code: -1,
          data: '',
          message: error.message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        code: -1,
        data: '',
        message: '没有token',
      };
      return;
    }
  };
};
