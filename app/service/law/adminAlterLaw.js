'use strict';

const Service = require('egg').Service;

class AdminAlterLawService extends Service {
  /**
   * @description 管理员修改案件
   * @return {object} 返回信息
   * @memberof AdminAlterLawService
   */
  async adminAlterLaw(
    id,
    caseNumber,
    accuser,
    defendant,
    caseTrial,
    caseType,
    caseReason,
    detail,
    agency,
    status_id,
    host,
    assiant,
    name,
    create_time,
    money,
  ) {
    const { ctx, service } = this;
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
      const law = await ctx.model.Law.Law.findOne({
        include: [
        {
          model: ctx.model.User.User
        },
        {
          model: ctx.model.Law.AgencyWord
        }],
        where: {
          id
        }
      })
      if (!law) {
        throw new Error('案件不存在')
      }
      let agencyRes = null;
      if (law.agency_word.url !== agency) {
        // 如果url存在差别，则插入新的代理词
        const agencyFileName = path.basename(agency)
        const agencyHtml = await service.law.finshLaw.downLoadFile(agency, agencyFileName)
        agencyRes = await ctx.model.Law.AgencyWord.create({
          url: agency,
          content: agencyHtml
        }, {
          transaction,
        })
      }
      await law.update({
        number: caseNumber,
        accuser,
        defendant,
        trial_level_id: lawTrialMap[caseTrial],
        type_id: lawTypeMap[caseType],
        base_info: caseReason,
        detail_info: detail,
        agency_word_id: agencyRes !== null ? agencyRes.id : law.agency_word.id,
        host_user_id: host.id,
        host_assist_scale: host.scale,
        status_id: status_id,
        name,
        create_time,
        money
      }, {
        transaction,
      })
      // 先批量删除协办人
      const lawAssistantList = await ctx.model.Law.LawAssistant.findAll({
          where: {
              law_id: id
          }
      })
      lawAssistantList.forEach(lawAssistant => {
        lawAssistant.destroy({ transaction });
      });
      // 再增加协办人
      for (let i = 0; i < assiant.length; i++) {
        const assiantItem = assiant[i];
        await ctx.model.Law.LawAssistant.create({
          law_id: id,
          assist_id: assiantItem.id,
          scale: assiantItem.scale
        }, {
          transaction
        })
      }
      const logResult = await service.log.create('案件信息被修改', null, null, false, id, transaction);
      if (logResult.code !== 0) {
        throw new Error(logResult.message);
      }
      await transaction.commit();
      await service.redis.updateLawsInRedis();
      await service.redis.updateLogsInRedis();
      await service.redis.updateUserInRedis();
      return ctx.retrunInfo(0, '', '修改案件成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AdminAlterLawService;
