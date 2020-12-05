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
    const query = ctx.query;
    const isAll = await service.util.transfromStringToBool(query.isAll);
    const status = query.status;
    const page = query.page

    // 验证请求参数是否正确
    if ((!status && !isAll) || !page) {
      return ctx.retrunInfo(-1, '', '请求参数错误');
    }

    const res = await service.law.lawList.getLawList(isAll, status, page);
    ctx.body = res;
  }

  // 修改案件
  async alterLaw() {
    const { ctx, service } = this;
    const res = await service.law.alterLaw.alterLaw();
    ctx.body = res;
  }

  // 增加案件
  async addLaw() {
    const { ctx, service } = this;
    const res = await service.law.addLaw.addLaw();
    ctx.body = res;
  }

  // 获取案件具体信息
  async getLawInfo() {
    const { ctx, service } = this;
    const res = await service.law.lawUtil.getLawInfo();
    ctx.body = res;
  }
}

module.exports = LawController;
