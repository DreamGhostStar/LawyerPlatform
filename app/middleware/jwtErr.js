'use strict';

module.exports = options => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    if (token) {
      try {
        // 解码token
        ctx.app.jwt.verify(token, options.secret);
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
