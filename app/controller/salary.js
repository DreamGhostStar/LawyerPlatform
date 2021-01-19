'use strict';

const Controller = require('egg').Controller;

class SalaryController extends Controller {
  // 获取收入列表
  async salaryList() {
    const { ctx, service } = this;
    const res = await service.salary.getSalaryList.getSalaryList();
    ctx.body = res;
  }

  // 收入页面获取用户信息
  async getUserInfo() {
    const { ctx, service } = this;
    const query = ctx.query;
    const { userID } = query
    const res = await service.salary.getUserInfo.getUserInfo(parseInt(userID));
    ctx.body = res;
  }

  // 获取用户收入列表
  async getUserSalaryList() {
    const { ctx, service } = this;
    const query = ctx.query;
    const { userID } = query
    const res = await service.salary.getUserSalaryList.getUserSalaryList(parseInt(userID));
    ctx.body = res;
  }
}

module.exports = SalaryController;
