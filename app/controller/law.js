'use strict';

const Controller = require('egg').Controller;

class LawController extends Controller {
  async downloadWordUrl() {
    const { ctx, service } = this;
    const res = await service.uploadFile.downloadFile();
    ctx.body = res;
  }
}

module.exports = LawController;
