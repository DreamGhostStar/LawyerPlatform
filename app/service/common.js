'use strict';

const Service = require('egg').Service;

class CommonService extends Service {
  // 获取jwt中传递的数据
  async getJWtData() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    const secret = app.config.jwt.secret;
    const tokenData = app.jwt.verify(token, secret);

    return tokenData;
  }

  // 生成6位随机数字组成的短信验证码
  async createNoteVerifyCode() {
    let noteVerifyCode = '';
    for (let index = 0; index < 6; index++) {
      noteVerifyCode += Math.floor(Math.random() * 10).toString();
    }
    return noteVerifyCode;
  }
}

module.exports = CommonService;
