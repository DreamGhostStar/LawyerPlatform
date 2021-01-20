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
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
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

  // 管理员修改案件
  async adminAlterLaw() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const {
      id,
      caseNumber,
      accuser,
      defendant,
      caseTrial,
      caseType,
      caseReason,
      detail,
      agency,
      host,
      assiant,
      name,
      create_time,
      status_id,
      money
    } = query
    if (ctx.isNull(id, caseNumber, accuser, defendant, caseTrial, caseType, caseReason, detail,
        agency, status_id, host, assiant, name, create_time, money)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '传递参数错误')
    } else {
      const res = await service.law.adminAlterLaw.adminAlterLaw(id, caseNumber, accuser, defendant, 
        caseTrial, caseType, caseReason, detail, agency, status_id, host, assiant, name, 
        create_time, money);
      ctx.body = res;
    }
  }

  // 增加案件
  async addLaw() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const {
      caseNumber,
      accuser,
      defendant,
      caseTrial,
      caseType,
      caseReason,
      detail,
      agency,
      host,
      assiant,
      name,
      create_time,
      money
    } = query
    if (ctx.isNull(caseNumber, accuser, defendant, caseTrial, caseType, caseReason, detail,
        agency, host, assiant, name, create_time, money)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '传递参数错误')
    } else {
      const res = await service.law.addLaw.addLaw(caseNumber, accuser, defendant, caseTrial,
        caseType, caseReason, detail, agency, host, assiant, name, create_time, money);
      ctx.body = res;
    }
  }

  // 获取案件具体信息
  async getLawInfo() {
    const { ctx, service } = this;
    const query = ctx.query;
    const caseID = query.caseID;
    if (ctx.isNull(caseID)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
    } else {
      const res = await service.law.lawInfo.getLawInfo(caseID);
      ctx.body = res;
    }
  }

  // 搜索案件
  async getLawInfo() {
    const { ctx, service } = this;
    const query = ctx.query;
    const title = query.title;
    if (ctx.isNull(title)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
    } else {
      const res = await service.law.searchLaw.search(title);
      ctx.body = res;
    }
  }

  // 申请结案
  async finishLaw() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const { caseID, agency_word, finish_word, reling_request } = query
    if (ctx.isNull(caseID) || ctx.isNull(finish_word) || ctx.isNull(reling_request)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
    } else {
      const res = await service.law.finshLaw.finishLaw(caseID, agency_word, finish_word, reling_request);
      ctx.body = res;
    }
  }
}

module.exports = LawController;
