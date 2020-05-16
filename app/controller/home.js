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
}

module.exports = HomeController;
