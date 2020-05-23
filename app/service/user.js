'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * @description 通过手机号获取用户基本信息
   * @param {string} phoneNumber 电话号码
   * @return {object} 是否成功，成功则返回用户基本信息
   * @memberof UserService
   */
  async getUserDataByPhone(phoneNumber) {
    const { service } = this;
    let userData;
    const userListInRedis = await service.redis.getUserInRedis();

    for (let index = 0; index < userListInRedis.length; index++) {
      if (userListInRedis[index].phone_number === phoneNumber) {
        userData = userListInRedis[index];
        break;
      }
    }

    return userData;
  }

  /**
   * @description 修改密码
   * @param {string} password 密码
   * @return {object} 是否成功
   * @memberof UserService
   */
  async modifyPassword(password) {
    const { service, ctx } = this;
    if (!password) {
      return ctx.retrunInfo(-1, '', '新密码不能为空');
    }

    const jwtData = await service.jwt.getJWtData();

    let transaction;
    try {
      transaction = await ctx.model.transaction();
      const userInfo = await ctx.model.User.User.findByPk(jwtData.userID); // 查找指定的user数据

      if (userInfo.password === password) {
        return ctx.retrunInfo(-1, '', '新密码不能与旧密码一致');
      }

      await userInfo.update({ password }, {
        transaction,
      });
      await ctx.model.User.UserUpdateTime.create({
        update_time: new Date().getTime().toString(),
        user_id: userInfo.id,
        decoration: '修改密码',
      }, {
        transaction,
      });

      await transaction.commit();
      return ctx.retrunInfo(0, '', '修改密码成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }

  /**
   * @description 获取用户详细信息
   * @param {Number} userID 用户ID
   * @return {object} 是否成功
   * @memberof UserService
   */
  async getUserInfo(userID) {
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
      lawyer_number: userInfo.lawyer_number, // 律师证号
      lawyer_office_address: userInfo.lawyer_office.lawyer_office_address, // // 律师所地址
      lawyer_office_name: userInfo.lawyer_office.lawyer_office_name,
      driver_scan_Image: userInfo.driver_scan_image, // 驾驶证扫描件
    };

    return ctx.retrunInfo(0, resUserInfo, '');
  }
}

module.exports = UserService;
