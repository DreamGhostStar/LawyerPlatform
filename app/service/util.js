'use strict';

const Service = require('egg').Service;

class UtilService extends Service {
  /**
   * @description 生成6位随机数字组成的短信验证码
   * @return {String} 6位随机数字的字符串
   * @memberof UtilService
   */
  async createNoteVerifyCode() {
    let noteVerifyCode = '';
    for (let index = 0; index < 6; index++) {
      noteVerifyCode += Math.floor(Math.random() * 10).toString();
    }
    return noteVerifyCode;
  }
}

module.exports = UtilService;
