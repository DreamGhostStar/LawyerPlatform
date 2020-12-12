'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 获取图片验证码
  async getImageVeriyCode() {
    const { ctx, service } = this;
    const res = await service.verifyCode.generateImage();
    ctx.body = res;
  }

  // 获取短信验证码
  async getNoteVerifyCode() {
    const { ctx, service } = this;
    const res = await service.verifyCode.sendNote(ctx.request.body.phoneNumber);
    ctx.body = res;
  }

  // 前端上传文件接口（返回链接）
  async uploadFiles() {
    const { ctx, service } = this;
    const uploadResult = await service.uploadFile.uploadFiles();
    ctx.body = uploadResult;
  }

  // 保存word文件url
  async reserveFileUrl() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const uploadResult = await service.reserveUrl.judgeAgencyOrReport(query);
    ctx.body = uploadResult;
  }

  // 前端上传图片接口
  async uploadImage() {
    const { ctx, service } = this;
    const res = await service.uploadFile.uploadFiles();
    ctx.body = res;
  }

  // 测试接口
  async test() {
    const { ctx, service } = this;
    const res = await service.util.test();
    ctx.body = res;
  }
}

module.exports = HomeController;
