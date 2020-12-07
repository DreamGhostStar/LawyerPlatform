'use strict';

const Service = require('egg').Service;

class UserUtilService extends Service {
  
  /**
   * @description 获取数据库中所有用户的信息
   * @return {Array} 数据库中用户的信息
   * @memberof UserUtilService
   */
  async getUsersInDataBase() {
    const { ctx } = this;
    const userListInDataBase = await ctx.model.User.User.findAll({
      include: [
        {
          model: ctx.model.User.Jurisdiction,
        },
        {
          model: ctx.model.User.LawyerOffice,
        },
      ],
    });

    return userListInDataBase;
  }

  /**
   * @description 通过手机号获取用户基本信息
   * @param {string} phoneNumber 电话号码
   * @return {object} 是否成功，成功则返回用户基本信息
   * @memberof UserUtilService
   */
  async getUserDataByPhone(phoneNumber) {
    const { service } = this;
    let userData;
    const userListInRedis = await service.redis.getUserInRedis();

    for (let index = 0; index < userListInRedis.length; index++) {
      if (userListInRedis[index].phone_number === phoneNumber) {
        userData = userListInRedis[index];
      }
    }
    
    return userData
  }
}

module.exports = UserUtilService;
