'use strict';

const Service = require('egg').Service;

class LawService extends Service {
  /**
   * @description 判断是该路径（或内容）是代理词还是结案文书
   * @param {object} query post请求数据
   * @return {object} 返回信息
   * @memberof LawService
   */
  async judgeAgencyOrReport(query) {
    const { ctx, service } = this;
    if (!query.law_id) {
      return ctx.retrunInfo(-1, '', '请求参数错误');
    }

    const law = await service.law.getLawByID(query.law_id);
    if (!law) {
      return ctx.retrunInfo(-1, '', '该案件不存在');
    }

    if (query.url) {
      if (query.type === 1) {
        return await this.addWordUrl(query.law_id, query.url, 'AgencyWord', 'agency_word_id');
      }
      return await this.addWordUrl(query.law_id, query.url, 'FinalReport', 'final_report_id');
    }

    if (query.content) {
      if (query.type === 1) {
        return await this.reserveContent(query.law_id, query.content, 'AgencyWord', 'agency_word_id');
      }
      return await this.reserveContent(query.law_id, query.content, 'FinalReport', 'final_report_id');
    }

    return ctx.retrunInfo(-1, '', '请求参数错误');
  }

  /**
   * @description 保存代理词或结案文书的url到数据库
   * @param {number} law_id 案件ID
   * @param {string} url 案件ID
   * @param {string} table 表
   * @param {string} field 字段
   * @return {object} 返回信息
   * @memberof LawService
   */
  async addWordUrl(law_id, url, table, field) {
    const { ctx, service } = this;
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      const law = await ctx.model.Law.Law.findByPk(law_id);

      // 如果数据库中已经有了代理词ID，则替换url，不然就创建新的代理词
      if (law[field]) {
        const word = await ctx.model.Law[table].findByPk(law[field]);
        await word.update({
          url,
        }, {
          transaction,
        });
      } else {
        const word = await ctx.model.Law[table].create({
          url,
          content: 'xxx', // TODO: 解析word文件
        }, {
          transaction,
        });
        await law.update({
          [field]: word.id,
        }, {
          transaction,
        });
      }

      await transaction.commit();
      await service.law.updateLawsInRedis();
      return ctx.retrunInfo(0, '', '保存成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }

  /**
   * @description 保存代理词或结案文书的用户自定义内容
   * @param {number} law_id 案件ID
   * @param {string} content 用户自定义内容
   * @param {string} table 表
   * @param {string} field 字段
   * @return {object} 返回信息
   * @memberof LawService
   */
  async reserveContent(law_id, content, table, field) {
    const { ctx, service } = this;
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      const law = await ctx.model.Law.Law.findByPk(law_id);

      // 如果数据库中已经有了代理词ID，则替换url，不然就创建新的代理词
      if (law[field]) {
        const word = await ctx.model.Law[table].findByPk(law[field]);
        await word.update({
          url: null,
          content,
        }, {
          transaction,
        });
      } else {
        const word = await ctx.model.Law[table].create({
          url: null,
          content,
        }, {
          transaction,
        });
        await law.update({
          [field]: word.id,
        }, {
          transaction,
        });
      }

      await transaction.commit();
      await service.law.updateLawsInRedis();
      return ctx.retrunInfo(0, '', '保存成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }


  /**
   * @description 修改当前用户的图片路径
   * @return {object} 返回信息
   * @memberof LawService
   */
  async modifyAvatarUrl() {
    const { ctx, service } = this;
    const avatar = ctx.request.body.url;
    if (!avatar) {
      return ctx.retrunInfo(-1, '', '请求参数错误');
    }
    const jwtData = await service.jwt.getJWtData();
    const user = await ctx.model.User.User.findByPk(jwtData.userID);
    try {
      user.update({
        avatar,
      });
      await service.law.updateLawsInRedis();
      return ctx.retrunInfo(0, '', '修改成功');
    } catch (error) {
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = LawService;
