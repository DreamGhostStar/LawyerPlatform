'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async index(query) {
    const res = await this.judgePhoneNumberExist(query.phoneNumber, query.password);
    return res;
  }

  // 验证账号和密码是否正确
  async judgePhoneNumberExist(phoneNumber, password) {
    const { ctx, app } = this;
    const result = await ctx.model.User.User.findOne({
      where: {
        phone_number: phoneNumber,
      },
    });

    if (result.password !== password) {
      return {
        code: 401,
        data: '',
        message: '用户名或密码错误',
      };
    }

    // 生成 token 的方式
    const token = app.jwt.sign({
      userID: result.id,
    }, app.config.jwt.secret, {
      expiresIn: 60 * 60 * 24, // 时间以秒为基准，过期时间为1天
    });

    return {
      code: 0,
      data: token,
      message: '登录成功',
    };
  }
}

module.exports = UserService;
