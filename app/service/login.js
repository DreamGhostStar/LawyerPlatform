'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  // 手机号和短信登录
  async inNote(phoneNumber, verify_code) {
    const { ctx, service } = this;
    const verifyCode = ctx.session.noteVerifyCode;

    if (phoneNumber === verifyCode.phoneNumber && verify_code === verifyCode.verifyCode) {
      const userData = await service.user.userUtil.getUserDataByPhone(phoneNumber);

      // 生成 token 的方式
      const token = await service.jwt.getToken({
        userID: userData.id,
      }, {
        expiresIn: 60 * 60 * 24 * 7, // 时间以秒为基准，过期时间为1天
      });

      return ctx.retrunInfo(0, token, '登录成功');
    }
    return ctx.retrunInfo(-1, '', '验证码错误');
  }

  // 手机号和密码登录
  async inPassword(query) {
    const { ctx, service } = this;
    const { phoneNumber, password } = query;
    const userData = await service.user.userUtil.getUserDataByPhone(phoneNumber);

    if (userData.password !== password) {
      return ctx.retrunInfo(1, '', '用户名或密码错误');
    }

    // 生成 token 的方式
    const token = await service.jwt.getToken({
      userID: userData.id,
    }, {
      expiresIn: 60 * 60 * 24 * 7, // 时间以秒为基准，过期时间为1天
    });

    return ctx.retrunInfo(0, token, '登录成功');
  }

  /**
   * @description 退出登录
   * @return {object} 返回信息
   * @memberof LoginService
   */
  async exit() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();
    const jwtWhiteList = await service.cache.get('jwtWhiteList');

    if (jwtWhiteList.length === 0 || !jwtWhiteList) {
      return ctx.retrunInfo(-1, '', 'token已失效，需重新获取');
    }

    const newWhiteList = [];
    for (let index = 0; index < jwtWhiteList.length; index++) {
      const jwtWhiteData = jwtWhiteList[index];
      if (jwtWhiteData.userID !== jwtData.userID) { // 如果是当前用户，则不加
        newWhiteList.push(jwtWhiteData);
      }
    }

    await service.cache.set('jwtWhiteList', newWhiteList);
    return ctx.retrunInfo(0, '', '退出成功');
  }
}

module.exports = LoginService;
