'use strict';

const Controller = require('egg').Controller;

class ScheduleController extends Controller {
  // 新建日程
  async create() {
    const { ctx, service } = this;
    const res = await service.schedule.create();
    ctx.body = res;
  }

  // 获取日程列表
  async getScheduleList() {
    const { ctx, service } = this;
    const res = await service.schedule.getSchedulesList();
    ctx.body = res;
  }

  // 修改日程
  async modify() {
    const { ctx, service } = this;
    const res = await service.schedule.modify();
    ctx.body = res;
  }

  // 删除日程
  async delete() {
    const { ctx, service } = this;
    const res = await service.schedule.delete();
    ctx.body = res;
  }
}

module.exports = ScheduleController;
