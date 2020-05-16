'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;

    console.log(ctx.state.user);
    /*
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/

    ctx.body = {
      code: 0,
      user: ctx.state.user,
      msg: '验证成功',
    };
  }

  async login() {
    const { ctx, app } = this;

    // 获取用户端传递过来的参数
    const data = ctx.request.query;
    console.log(data);

    // 生成 token 的方式
    const token = app.jwt.sign({
      username: data.username,
    }, app.config.jwt.secret, {
      expiresIn: 60 * 60 * 24,
    });

    // 返回 token 到前端
    ctx.body = token;
  }
}

module.exports = AdminController;
