'use strict';

const Service = require('egg').Service;

class LawInfoService extends Service {
  /**
   * @description 获取案件具体信息
   * @param {number} caseId 案件ID
   * @return {object} 返回信息
   * @memberof LawInfoService
   */
  async getLawInfo(caseId) {
    const { ctx, service } = this
    const lawInfo = await ctx.model.Law.Law.findOne({
      include: [
      {
        model: ctx.model.Law.AgencyWord,
      },
      {
        model: ctx.model.Law.FinalReport,
      },
      {
        model: ctx.model.Law.LawStatus,
      },
      {
        model: ctx.model.User.User,
      }, 
      {
        model: ctx.model.Law.LawType,
      },
      {
        model: ctx.model.Law.LawAudit,
      },
    ],
      where: {
        id: caseId,
      },
    });

    const hostUserInfo = await ctx.model.User.User.findByPk(lawInfo.host_user_id)

    const guest_list = lawInfo.users.map(user => {
      return {
        guest_id: user.id,
        guest_name: user.name,
        guest_phone: user.phone_number,
        guest_lawyer_number: user.lawyer_number,
      }
    })

    return ctx.retrunInfo(0, {
      name: lawInfo.name,
      status: await service.law.lawUtil.getLawStatus(lawInfo.law_status.value),
      plaintiff: lawInfo.accuser,
      defendant: lawInfo.defendant,
      host: {
        id: hostUserInfo.id,
        name: hostUserInfo.name,
        phone: hostUserInfo.phone_number,
        lawyer_number: hostUserInfo.lawyer_number,
      },
      guest_list: guest_list,
      base_info: lawInfo.base_info,
      detail_info: lawInfo.detail_info,
      type: await service.law.lawUtil.getLawType(lawInfo.law_type.value),
      audit: await service.law.lawUtil.getLawAudit(lawInfo.law_audit.value),
      scale: parseFloat(lawInfo.host_assist_scale),
      agency_word: lawInfo.agency_word === null?null: lawInfo.agency_word.url,
      final_report: lawInfo.final_report === null?null: lawInfo.final_report.url,
    }, '')
  }
}

module.exports = LawInfoService;
