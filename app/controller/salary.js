'use strict';

const Controller = require('egg').Controller;

class SalaryController extends Controller {
  async salaryList() {
    const { ctx, service } = this;
    const res = await service.salary.getSalaryList();
    ctx.body = res;
  }
}

module.exports = SalaryController;
