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
    
    return userData;
  }

  /**
   * @description 查看是否是管理员登录
   * @param {number} userID 用户ID
   * @return {object} 是否是管理员
   * @memberof UserUtilService
   */
  async isAdmin(userID) {
    const { service } = this;
    const userListInRedis = await service.redis.getUserInRedis();

    for (let index = 0; index < userListInRedis.length; index++) {
      const userItem = userListInRedis[index];
      if (userItem.id === userID) {
        if(userItem.jurisdiction.id === 2){
          return {
            res: true,
            message: "管理员身份"
          }
        }

        return {
          res: false,
          message: "该用户不是管理员"
        }
      }
    }
    
    return {
      res: false,
      message: "未找到该用户"
    };
  }

  /**
   * @description 验证手机号是否已存在
   * @param {string} phone 电话号码
   * @return {boolean} 是否存在
   * @memberof UserUtilService
   */
  async verifyPhone(phone) {
    const { service } = this;
    const userListInRedis = await service.redis.getUserInRedis();

    for (let index = 0; index < userListInRedis.length; index++) {
      const userItem = userListInRedis[index]
      if (userItem.phone_number === phone) {
        return false
      }
    }
    
    return true;
  }

  /**
   * @description 验证身份证号是否已存在
   * @param {string} identifyNumber 身份证号
   * @return {boolean} 是否存在
   * @memberof UserUtilService
   */
  async verifyIdentify(identifyNumber) {
    const { service } = this;
    const userListInRedis = await service.redis.getUserInRedis();

    for (let index = 0; index < userListInRedis.length; index++) {
      const userItem = userListInRedis[index]
      if (userItem.identify_number === identifyNumber) {
        return false
      }
    }
    
    return true;
  }

  /**
   * @description 验证律师证号是否已存在
   * @param {string} lawyerNumber 律师证号
   * @return {boolean} 是否存在
   * @memberof UserUtilService
   */
  async verifyLawyerNumber(lawyerNumber) {
    const { service } = this;
    const userListInRedis = await service.redis.getUserInRedis();

    for (let index = 0; index < userListInRedis.length; index++) {
      const userItem = userListInRedis[index]
      if (userItem.lawyer_number === lawyerNumber) {
        return false
      }
    }
    
    return true;
  }

  /**
   * @description 验证律师资格证号是否已存在
   * @param {string} qualificationsNumber 律师资格证号
   * @return {boolean} 是否存在
   * @memberof UserUtilService
   */
  async verifyQualificationsNumber(qualificationsNumber) {
    const { service } = this;
    const userListInRedis = await service.redis.getUserInRedis();

    for (let index = 0; index < userListInRedis.length; index++) {
      const userItem = userListInRedis[index]
      if (userItem.law_number === qualificationsNumber) {
        return false
      }
    }
    
    return true;
  }
}

module.exports = UserUtilService;
