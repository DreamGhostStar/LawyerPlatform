'use strict';

const Service = require('egg').Service;
const mammoth = require("mammoth");
const path = require('path')

class UtilService extends Service {
  /**
   * @description 生成6位随机数字组成的短信验证码
   * @return {String} 6位随机数字的字符串
   * @memberof UtilService
   */
  async createNoteVerifyCode() {
    // TODO: 项目正式运行的时候将此注释取消
    // eslint-disable-next-line no-unused-vars
    let noteVerifyCode = '';
    for (let index = 0; index < 6; index++) {
      noteVerifyCode += Math.floor(Math.random() * 10).toString();
    }
    // return noteVerifyCode;
    return '123456';
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

  async numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
  }

  // 获取word文本
  async test(){
    mammoth.convertToHtml({ path: path.join(__dirname, "../public/word/中文文件名.docx") })
      .then(function (result) {
        // var html = result.value; // The generated HTML
        // var messages = result.messages; // Any messages, such as warnings during conversion
        console.log(result.value)
      })
      .done();
  }
}

module.exports = UtilService;
