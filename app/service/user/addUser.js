'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class AddUserService extends Service {
  /**
   * @description 生成账号
   * @return {object} 返回信息
   * @memberof AddUserService
   */
  async addUser(
    identify,
    lawyerNumber, // 律师证号
    identifyNumber, // 身份证号
    name,
    avatar, // 头像
    qualificationsNumber, // 法律资格证号
    phone,
    startTime, // 职业开始时间
    age,
    sex
  ) {
    const { ctx, service } = this
    if(identify !== 'common_lawyer' && identify !== 'administrator'){
        return ctx.retrunInfo(-1, '', '创建的身份错误')
    }
    const identifyID = identify === 'common_lawyer' ? 1 : 2
    let transaction;
    try {
      transaction = await ctx.model.transaction();

      await ctx.model.User.User.create({
        jurisdiction_id: identifyID,
        lawyer_number: lawyerNumber,
        identify_number: identifyNumber,
        name,
        avatar,
        law_number: qualificationsNumber,
        phone_number: phone,
        start_time: startTime,
        age,
        sex,
        lawyer_office_id: 1, // TODO：暂时未添加其他律师事务所
        password: md5('123456') // 默认密码为123456
      }, {
        transaction,
      });

      await transaction.commit();
      await service.redis.updateUserInRedis(); // 生成账号后刷新缓存
      return ctx.retrunInfo(0, '', '新增用户信息成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AddUserService;
