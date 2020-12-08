'use strict';

const Service = require('egg').Service;

class InfoService extends Service {
  /**
   * @description 获取用户基本信息
   * @param {number | null} userID 所求userID
   * @param {number} ownUserID 自己的用户ID
   * @return {object} 是否成功
   * @memberof UserService
   */
  async baseInfo(userID, ownUserID) {
    const { ctx, service } = this;
    let userInfo;
    const targetUserID = userID === null ? userID : ownUserID;
    const userListInRedis = await service.redis.getUserInRedis();
    userListInRedis.forEach(user => {
      if (user.id === targetUserID) {
        userInfo = user;
        return;
      }
    });
    const { name, avatar, lawyer_number } = userInfo;
    return ctx.retrunInfo(0, { name, avatar, lawyer_number }, '');
  }

  /**
   * @description 获取用户详细信息
   * @param {number} userID 用户ID
   * @return {object} 是否成功
   * @memberof InfoService
   */
  async detailInfo(userID) {
    const { ctx, service } = this;
    let userInfo;
    const userListInRedis = await service.redis.getUserInRedis();
    userListInRedis.forEach(user => {
      if (user.id === userID) {
        userInfo = user;
        return;
      }
    });

    const resUserInfo = {
      weixinNumber: userInfo.weixin_number,
      avatar: userInfo.avatar,
      name: userInfo.name, // 真实姓名
      sex: userInfo.sex,
      age: userInfo.age,
      phoneNumber: userInfo.phone_number,
      lawyer_scan_Image: userInfo.lawyer_scan_image,
      driver_scan_Image: userInfo.driver_scan_image, // 驾驶证扫描件
    };

    return ctx.retrunInfo(0, resUserInfo, '');
  }
}

module.exports = InfoService;
