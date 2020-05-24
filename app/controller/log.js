'use strict';

const Controller = require('egg').Controller;

class LogController extends Controller {
  // 新建日志
  async create() {
    const { ctx, service } = this;
    const res = await service.log.create();
    ctx.body = res;
  }

  // 获取日志列表信息
  async getLogsList() {
    const { ctx, service } = this;
    const res = await service.log.getLogsList();
    ctx.body = res;
  }

  // 修改日志信息
  async modify() {
    const { ctx, service } = this;
    const res = await service.log.modifyLogInfo();
    ctx.body = res;
  }

  // 删除日志
  async delete() {
    const { ctx, service } = this;
    const res = await service.log.deleteLog();
    ctx.body = res;
  }
}

module.exports = LogController;
