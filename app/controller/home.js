'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Student.findAll({
      include: [{
        model: ctx.model.Lession,
      }],
    });
    ctx.body = res;
  }
}

module.exports = HomeController;
