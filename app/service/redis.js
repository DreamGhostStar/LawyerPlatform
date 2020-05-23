'use strict';

const Service = require('egg').Service;

class RedisService extends Service {
  /**
   * @description 在数据改变之后，更新redis中laws的数据
   * @memberof LawService
   */
  async updateLawsInRedis() {
    const { service } = this;
    const lawListInRedis = await service.law.getLawsInDataBase();
    await this.ctx.service.cache.set('laws', lawListInRedis);
  }

  async getLawsInRedis() {
    const { service } = this;
    let lawListInRedis = await service.cache.get('laws'); // 调用缓存
    if (!lawListInRedis) {
      lawListInRedis = await service.law.getLawsInDataBase();
      await service.cache.set('laws', lawListInRedis);
    }

    return lawListInRedis;
  }

  /**
   * @description 从缓存中获取用户数据
   * @return {Array} 缓存中的用户数据
   * @memberof RedisService
   */
  async getUserInRedis() {
    const { service } = this;
    let userListInRedis = await service.cache.get('user'); // 调用缓存
    if (!userListInRedis) {
      userListInRedis = await service.user.getUsersInDataBase();
      await service.cache.set('user', userListInRedis);
    }

    return userListInRedis;
  }

  /**
   * @description 进行与修改用户相关操作的话，需要更新缓存
   * @memberof RedisService
   */
  async updateUserInRedis() {
    const { service } = this;
    const userListInRedis = await service.user.getUsersInDataBase();
    await service.cache.set('user', userListInRedis);
  }

  /**
   * @description 从缓存中获取用户数据
   * @return {Array} 缓存中的用户数据
   * @memberof RedisService
   */
  async getLogsInRedis() {
    const { service } = this;
    let logListInRedis = await service.cache.get('logs'); // 调用缓存
    if (!logListInRedis) {
      logListInRedis = await service.log.getLogsInDataBase();
      await service.cache.set('logs', logListInRedis);
    }

    return logListInRedis;
  }

  /**
   * @description 进行与修改用户相关操作的话，需要更新缓存
   * @memberof RedisService
   */
  async updateLogsInRedis() {
    const { service } = this;
    const logListInRedis = await service.log.getLogsInDataBase();
    await service.cache.set('user', logListInRedis);
  }
}

module.exports = RedisService;
