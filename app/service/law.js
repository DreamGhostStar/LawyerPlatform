'use strict';

const Service = require('egg').Service;

class LawService extends Service {
  /**
   * @description 获取数据库中所有案件的信息
   * @return {Array} 数据库中案件的信息
   * @memberof LawService
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
      ],
    });

    return lawListInDataBase;
  }

  /**
   * @description 通过案件ID来获取指定信息
   * @param {number} id 案件ID
   * @return {object} 指定案件的信息
   * @memberof LawService
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
   * @memberof LawService
   */
  async getWordUrl(id, type) {
    const law = await this.getLawByID(id);
    if (law[type]) {
      return law[type].url;
    }

    return null;
  }


  /**
   *
   * @description 获取案件列表信息
   * @return {Array} 案件列表信息
   * @memberof LawService
   */
  async getLawList() {
    const { ctx, service } = this;
    const query = ctx.query;
    const isAll = await service.util.transfromStringToBool(query.isAll);
    const status = query.status;
    const lawRedisList = await service.redis.getLawsInRedis();

    if (isAll) {
      return ctx.retrunInfo(0, lawRedisList, '');
    }

    if (!status) {
      return ctx.retrunInfo(-1, '', '请求参数错误');
    }

    const lawList = [];
    lawRedisList.forEach(law => {
      if (law.law_status.value === status) {
        const temp = {};
        temp.law_id = law.id;
        temp.name = law.name;
        temp.state = law.law_status.value;
        temp.base_info = law.base_info;
        temp.type = law.law_type.value;
        temp.agency_word = law.agency_word ? law.agency_word.url : null;
        temp.finish_file = law.finish_file ? law.finish_file.url : null;
        lawList.push(temp);
      }
    });
    return ctx.retrunInfo(0, lawList, '');
  }

  /** FIXME: 接口文档有问题
   * @description 修改案件信息
   * @return {object} 返回信息
   * @memberof LawService
   */
  async alterLaw() {
    const { ctx } = this;
    const query = ctx.request.body;
    const { id, accuser, defendant, trial_level, classifcation, details, agency_view, host, guest, scale } = query;

    if (typeof id !== 'number') {
      return ctx.retrunInfo(-1, '', 'id请求类型错误');
    }
    let transaction;

    try {
      transaction = await ctx.model.transaction();
      const law = await ctx.model.User.User.findByPk(id); // 查找指定的user数据
      await law.update({
        accuser,
        defendant,
        base_info: details,
      }, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  }
}

module.exports = LawService;
