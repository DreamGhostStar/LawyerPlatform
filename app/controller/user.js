'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 手机号和密码登录接口
  async loginInpassword() {
    const { ctx, service } = this;
    const res = await service.login.index(ctx.request.body);
    ctx.body = res;
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx, service } = this;
    const jwtData = await service.common.getJWtData();
    const res = await service.user.getUserInfo(jwtData.userID);
    ctx.body = res;
  }
}

module.exports = UserController;
