'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class CommonService extends Service {
  // 生成图片验证码
  async generateImageVerifyCode() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#f00',
    });

    let res = {
      code: 0,
      data: captcha.data,
      message: '请求成功',
    };

    if (!captcha.data) {
      res = {
        code: 403,
        data: '',
        message: '请求验证码错误',
      };
    }

    ctx.session.maxAge = 1000 * 60 * 5; // 5分钟
    ctx.session.renew = false; // 设置在连续访问的时候不刷新剩余时间
    ctx.session.verifyCode = captcha.text;
    return res;
  }

  // 获取jwt中传递的数据
  async getJWtData() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    const secret = app.config.jwt.secret;
    const tokenData = app.jwt.verify(token, secret);

    return tokenData;
  }
}

module.exports = CommonService;
