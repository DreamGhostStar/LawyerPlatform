'use strict';

const Service = require('egg').Service;

class ModifyPasswordService extends Service {
    /**
     * @description 修改密码
     * @param {string} password 密码
     * @return {boolean} 是否成功
     * @memberof ModifyPasswordService
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
        await service.redis.updateUserInRedis(); // 在修改密码之后必须更新缓存
        return ctx.retrunInfo(0, '', '修改密码成功');
      } catch (error) {
        await transaction.rollback();
        return ctx.retrunInfo(-1, '', error.message);
      }
    }
}

module.exports = ModifyPasswordService;
