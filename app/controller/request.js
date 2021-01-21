'use strict';

const Controller = require('egg').Controller;

class RequestController extends Controller {
  // 获取归档word文件
  async requestWord() {
    const { ctx, service } = this;
    const query = ctx.query;
    const { requestID } = query
    if (ctx.isNull(requestID)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '传递参数错误')
    } else {
      const res = await service.request.requestWord(parseInt(requestID));
      ctx.body = res;
    }
  }
  
  // 获取归档请求列表
  async requestWordList() {
    const { ctx, service } = this;
    const res = await service.request.requestWordList();
    ctx.body = res;
  }

  // （不）同意归档请求
  async agreeRequest() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const { requestID, isAgree, message } = query
    if (ctx.isNull(requestID, isAgree, message)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '传递参数错误')
    } else {
      const res = await service.request.agreeRequest(requestID, isAgree, message);
      ctx.body = res;
    }
  }
}

module.exports = RequestController;
