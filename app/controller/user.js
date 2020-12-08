'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 手机号和密码登录接口
  async loginInPassword() {
    const { ctx, service } = this;
    const res = await service.login.inPassword(ctx.request.body);
    ctx.body = res;
  }

  // 手机号和短信登录接口
  async loginInNote() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const res = await service.login.inNote(query.phoneNumber, query.verification_code);
    ctx.body = res;
  }

  // 修改密码接口
  async modifyPassword() {
    const { ctx, service } = this;
    const res = await service.user.modifyPassword.modifyPassword(ctx.request.body.new_password);
    ctx.body = res;
  }

  // 退出登录
  async exit() {
    const { ctx, service } = this;
    const res = await service.login.exit();
    ctx.body = res;
  }

  // 获取用户详细信息
  async getUserInfo() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();

    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }

    const res = await service.user.info.detailInfo(jwtData.userID);
    ctx.body = res;
  }

  // 获取用户基本信息
  async getBaseUserInfo() {
    const { ctx, service } = this;
    const query = ctx.query
    const userID = query.userID
    const jwtData = await service.jwt.getJWtData();
    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }

    const res = await service.user.info.baseInfo(userID, jwtData.userID);
    ctx.body = res;
  }

  // 修改头像
  async modifyAvatar() {
    const { ctx, service } = this;
    const res = await service.reserveUrl.modifyAvatarUrl();
    ctx.body = res;
  }

  // 修改头像
  async getCardInfo() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();
    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }
    const res = await service.user.card.getInfo(jwtData.userID);
    ctx.body = res;
  }

  // 获取通知消息列表
  async getMessageList() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();
    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }
    const res = await service.message.getList.getMessageList(jwtData.userID);
    ctx.body = res;
  }
}

module.exports = UserController;
