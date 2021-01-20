'use strict';

const Service = require('egg').Service;
const path = require('path')

class AddLawService extends Service {
  /**
   * @description 新建案件
   * @return {object} 返回信息
   * @memberof AddLawService
   */
  async addLaw(
    caseNumber,
    accuser,
    defendant,
    caseTrial,
    caseType,
    caseReason,
    detail,
    agency, // 代理词URL
    host,
    assiant,
    name,
    create_time,
    money
  ) {
    const { ctx, service } = this
    let transaction;
    transaction = await ctx.model.transaction(); // 定义事务
    try {
      const lawTrialMap = {
        invest: 1,
        prosecute: 2,
        first_instance: 3,
        second_instance: 4,
        review: 5,
        arbitrament: 6
      }
      const lawTypeMap = {
        civil: 1,
        criminal: 2,
        administrative: 3,
        non_lawsuit: 4
      }
      const agencyFileName = path.basename(agency)
      const agencyHtml = await service.law.finshLaw.downLoadFile(agency, agencyFileName)
      const agencyRes = await ctx.model.Law.AgencyWord.create({
        url: agency,
        content: agencyHtml
      }, {
        transaction,
      })
      const caseRes = await ctx.model.Law.Law.create({
        number: caseNumber,
        accuser,
        defendant,
        trial_level_id: lawTrialMap[caseTrial],
        type_id: lawTypeMap[caseType],
        base_info: caseReason,
        detail_info: detail,
        agency_word_id: agencyRes.id,
        host_user_id: host.id,
        host_assist_scale: host.scale,
        status_id: 1, // TODO: 案件状态默认在办
        name,
        create_time,
        money
      }, {
        transaction,
      })
      for (let i = 0; i < assiant.length; i++) {
        const assiantItem = assiant[i];
        await ctx.model.Law.LawAssistant.create({
          law_id: caseRes.id,
          assist_id: assiantItem.id,
          scale: assiantItem.scale
        }, {
          transaction
        })
      }
      await transaction.commit();
      return ctx.retrunInfo(0, agencyRes, '增加案件成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AddLawService;
