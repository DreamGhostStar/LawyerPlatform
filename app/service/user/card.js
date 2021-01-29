'use strict';

const Service = require('egg').Service;

class CardService extends Service {
  /**
   * @description 修改密码
   * @param {string} userID 密码
   * @return {boolean} 是否成功
   * @memberof CardService
   */
  async getInfo(userID) {
    const { ctx, service } = this
    let userInfo;
    const userListInRedis = await service.redis.getUserInRedis();
    userListInRedis.forEach(user => {
      if (user.id === userID) {
        userInfo = user;
        return;
      }
    });
    return ctx.retrunInfo(0, {
      avatar: userInfo.avatar,
      name: userInfo.name, // 真实姓名
      phoneNumber: userInfo.phone_number,
      lawyer_number: userInfo.lawyer_number, // 律师证号
      lawyer_office_address: userInfo.lawyer_office.lawyer_office_address, // // 律师所地址
      lawyer_office_name: userInfo.lawyer_office.lawyer_office_name,
      vx_code: 'http://lawyer.youchen-blog.cn/mmqrcode1611914670725.png'
    }, '获取成功')
  }
}

module.exports = CardService;
