'use strict';

const Service = require('egg').Service;

class LawService extends Service {
  /**
   * @description 通过案件ID来获取指定信息
   * @param {number} id 案件ID
   * @return {object} 指定案件的信息
   * @memberof LawService
   */
  async getLawByID(id) {
    const { ctx } = this;
    let lawData;
    let lawListInRedis = await ctx.service.cache.get('laws'); // 调用缓存
    if (!lawListInRedis) {
      lawListInRedis = await ctx.model.Law.Law.findAll({
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

    lawListInRedis.forEach(law => {
      if (law.id === id) {
        lawData = law;
      }
    });
    return lawData;
  }


  /**
   * @description 通过案件ID和类型获取对应word文档的URL
   * @param {number} id 案件ID
   * @param {string} type 是结案文书还是代理词
   * @return {null | string} 返回word文档的URL
   * @memberof LawService
   */
  async getWordUrl(id, type) {
    const law = await this.getLawByID(id);
    if (law[type]) {
      return law[type].url;
    }

    return null;
  }
}

module.exports = LawService;
