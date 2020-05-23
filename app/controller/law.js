'use strict';

const Controller = require('egg').Controller;

class LawController extends Controller {
  // 下载文件
  async downloadWordUrl() {
    const { ctx, service } = this;
    const res = await service.uploadFile.downloadFile();
    ctx.body = res;
  }

  // 获取案件列表信息
  async getLawList() {
    const { ctx, service } = this;
    const res = await service.law.getLawList();
    ctx.body = res;
  }

  // 修改案件
  async alterLaw() {
    const { ctx, service } = this;
    const res = await service.law.alterLaw();
    ctx.body = res;
  }
}

module.exports = LawController;
