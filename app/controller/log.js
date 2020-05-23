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
}

module.exports = LogController;
