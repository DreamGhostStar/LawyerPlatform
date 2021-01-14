'use strict';

const Service = require('egg').Service;

class AlterInfoService extends Service {
  async alterUserInfo(userID, name, phoneNumber, lawyer_number, weixin_number) {
    const { ctx, service } = this;
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      const userInfo = await ctx.model.User.User.findByPk(userID); // 查找指定的user数据

      await userInfo.update({
        name,
        phone_number: phoneNumber,
        lawyer_number,
        weixin_number
      }, {
        transaction,
      });
      await ctx.model.User.UserUpdateTime.create({
        update_time: new Date().getTime().toString(),
        user_id: userInfo.id,
        decoration: '修改用户信息',
      }, {
        transaction,
      });

      await transaction.commit();
      await service.redis.updateUserInRedis(); // 在修改密码之后必须更新缓存
      return ctx.retrunInfo(0, '', '修改用户信息成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AlterInfoService;
