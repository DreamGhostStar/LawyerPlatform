'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async index(query) {
    const resInverifyCode = await this.verifyCode(query.verification_code);

    if (!resInverifyCode) {
      const res = await this.judgePhoneNumberExist(query.number, query.password);
      return res;
    }

    return resInverifyCode;
  }

  // 验证验证码是否正确
  async verifyCode(verifyCode) {
    const { ctx } = this;
    if (verifyCode.length !== 4) {
      return {
        code: -1,
        data: '',
        message: '验证码位数错误',
      };
    }

    if (!ctx.session.verifyCode) {
      return {
        code: 403,
        data: '',
        message: '验证码已失效',
      };
    }

    if (verifyCode !== ctx.session.verifyCode) {
      return {
        code: 403,
        data: '',
        message: '验证码错误',
      };
    }

    return false;
  }

  // 验证账号和密码是否正确
  async judgePhoneNumberExist(phoneNumber, password) {
    if (phoneNumber.length !== 11) {
      return {
        code: -1,
        data: '',
        message: '手机号位数不为11位',
      };
    }

    const { ctx, app } = this;
    const result = await ctx.model.User.User.findOne({
      where: {
        phone_number: phoneNumber,
      },
    });

    if (!result) {
      return {
        code: 401,
        data: '',
        message: '该号码不存在',
      };
    }

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
