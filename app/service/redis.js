'use strict';

const Service = require('egg').Service;

class RedisService extends Service {
  /**
   * @description 在数据改变之后，更新redis中laws的数据
   * @memberof LawService
   */
  async updateLawsInRedis() {
    const { ctx } = this;
    const lawListInRedis = await ctx.model.Law.Law.findAll({
      include: [
        {
          model: ctx.model.Law.AgencyWord,
        },
        {
          model: ctx.model.Law.FinalReport,
        },
      ],
    });
    await this.ctx.service.cache.set('laws', lawListInRedis);
  }

  async getUserInRedis() {
    const { ctx } = this;
    let userListInRedis = await ctx.service.cache.get('user'); // 调用缓存
    if (!userListInRedis) {
      userListInRedis = await ctx.model.User.User.findAll({
        include: [
          {
            model: ctx.model.User.Jurisdiction,
          },
          {
            model: ctx.model.User.LawyerOffice,
          },
        ],
      });
      await this.ctx.service.cache.set('user', userListInRedis);
    }

    return userListInRedis;
  }
}

module.exports = RedisService;
