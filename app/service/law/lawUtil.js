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
        model: ctx.model.Law.ResultRequest,
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
   * @description status对照表
   * @param {string} status status值
   * @return {string} 返回status对应的中文值
   * @memberof LawUtilService
   */
  async getLawStatus(status) {
    const map = {
      "in_office": "在办",
      "end_office": '归档'
    }

    return map[status];
  }

  /**
   * @description type对照表
   * @param {string} type type值
   * @return {string} 返回type对应的中文值
   * @memberof LawUtilService
   */
  async getLawType(type) {
    const map = {
      "civil": "民事",
      "criminal": '刑事',
      "administrative": '行政',
      "non_lawsuit": '非诉讼业务'
    }

    return map[type];
  }

  /**
   * @description type对照表
   * @param {string} audit type值
   * @return {string} 返回type对应的中文值
   * @memberof LawUtilService
   */
  async getLawAudit(audit) {
    const map = {
      "invest": "侦查",
      "prosecute": '起诉',
      "first_instance": '一审',
      "second_instance": '二审',
      "review": '再审',
      "arbitrament": '仲裁'
    }

    return map[audit];
  }
}

module.exports = LawUtilService;
