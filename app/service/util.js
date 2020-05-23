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

  /**
   * @description 将字符串转换成布尔值
   * @param {string} data 将要转换的字符串
   * @return {boolean} 布尔值
   * @memberof UtilService
   */
  async transfromStringToBool(data) {
    const contrast = {
      true: true,
      false: false,
    };

    return contrast[data];
  }

  /**
   * @description 将字符串转换成数字
   * @param {string} data 将要转换的字符串
   * @return {boolean} 数字
   * @memberof UtilService
   */
  async transfromStringToNumber(data) {
    return parseInt(data);
  }
}

module.exports = UtilService;
