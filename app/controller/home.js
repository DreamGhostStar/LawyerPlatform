'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.model.User.User.findAll({
      include: [
        {
          model: ctx.model.User.Jurisdiction,
        },
        {
          model: ctx.model.User.LawyerOffice,
        },
        {
          model: ctx.model.Law.Law,
        },
      ],
    });
    ctx.body = res;
  }

  // 获取图片验证码
  async getImageVeriyCode() {
    const { ctx, service } = this;
    const res = await service.verifyCode.generateImage();
    ctx.body = res;
  }

  // 获取短信验证码
  async getNoteVerifyCode() {
    const { ctx, service } = this;
    const res = await service.verifyCode.sendNote(ctx.request.body.phoneNumber);
    ctx.body = res;
  }
}

module.exports = HomeController;
