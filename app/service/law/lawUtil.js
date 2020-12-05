'use strict';

const Service = require('egg').Service;

class LawUtilService extends Service {
  /**
   * @description 获取数据库中所有案件的信息
   * @return {Array} 数据库中案件的信息
   * @memberof LawUtilService
   */
  async getLawsInDataBase() {
    const { ctx } = this;
    const lawListInDataBase = await ctx.model.Law.Law.findAll({
      include: [
      {
        model: ctx.model.Law.AgencyWord,
      },
      {
        model: ctx.model.Law.FinalReport,
      },
      {
        model: ctx.model.Law.LawType,
      },
      {
        model: ctx.model.Law.LawStatus,
      },
      {
        model: ctx.model.Law.LawAudit,
      },
      {
        model: ctx.model.User.User,
      }, ],
    });

    return lawListInDataBase;
  }

  /**
   * @description 通过案件ID来获取指定信息
   * @param {number} id 案件ID
   * @return {object} 指定案件的信息
   * @memberof LawUtilService
   */
  async getLawByID(id) {
    const { service } = this;
    let lawData;
    const lawListInRedis = await service.redis.getLawsInRedis();

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
   * @memberof LawUtilService
   */
  async getWordUrl(id, type) {
    const law = await this.getLawByID(id);
    if (law[type]) {
      return law[type].url;
    }

    return null;
  }

  /**
   * @description 获取案件具体信息
   * @return {object} 返回信息
   * @memberof LawUtilService
   */
  async getLawInfo(){

  }
}

module.exports = LawUtilService;
