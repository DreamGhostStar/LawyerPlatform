'use strict';

const Service = require('egg').Service;
const path = require('path')

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
      }, ],
      where: {
        id: caseId,
      },
    });

    const hostUserInfo = await ctx.model.User.User.findByPk(lawInfo.host_user_id)

    const guest_list = lawInfo.users.map(user => {
      return user.name
    })

    // 代理词HTML获取
    let agencyWordHtml = null
    const agencyWordUrl = lawInfo.agency_word === null ? null : lawInfo.agency_word.url
    if (agencyWordUrl) {
      agencyWordHtml = await service.law.finshLaw.downLoadFile(agencyWordUrl)
    }
    
    // 结案文书HTML获取
    let finalReportHtml = null
    const finalReportUrl = lawInfo.final_report === null ? null : lawInfo.final_report.url
    if (finalReportUrl) {
      finalReportHtml = await service.law.finshLaw.downLoadFile(finalReportUrl)
    }

    return ctx.retrunInfo(0, {
      name: lawInfo.name,
      status: await service.law.lawUtil.getLawStatus(lawInfo.law_status.value),
      plaintiff: lawInfo.accuser,
      defendant: lawInfo.defendant,
      host: hostUserInfo.name,
      guest_list: guest_list,
      base_info: lawInfo.base_info,
      detail_info: lawInfo.detail_info,
      type: await service.law.lawUtil.getLawType(lawInfo.law_type.value),
      audit: await service.law.lawUtil.getLawAudit(lawInfo.law_audit.value),
      scale: parseFloat(lawInfo.host_assist_scale),
      agency_word: ctx.isNull(agencyWordHtml) ? null : agencyWordHtml,
      final_report: ctx.isNull(finalReportHtml) ? null : finalReportHtml,
    }, '')
  }

  /**
   * @description 管理员获取案件具体信息
   * @param {number} id 案件ID
   * @return {object} 返回信息
   * @memberof LawInfoService
   */
  async adminGetLawInfo(id) {
    const { ctx, service } = this
    const laws = await service.redis.getLawsInRedis();
    let law = null;
    laws.map(lawItem => {
      if (lawItem.id === id) {
        law = lawItem
      }
    })

    if (!law) {
      return ctx.retrunInfo(-1, '', '不存在该案件')
    }
    const hostUserInfo = await ctx.model.User.User.findByPk(law.host_user_id)
    const assistList = [];
    for (let i = 0; i < law.users.length; i++) {
      const lawAssist = law.users[i];
      const assistUserInfo = await ctx.model.User.User.findByPk(lawAssist.law_assistant.assist_id)
      assistList.push({
        id: lawAssist.law_assistant.id,
        username: lawAssist.law_assistant.scale,
        scale: assistUserInfo.name
      })
    }

    return ctx.retrunInfo(0, {
      caseNumber: law.number,
      name: law.name,
      money: law.money,
      accuser: law.accuser,
      defendant: law.defendant,
      caseTrial: law.law_audit.value,
      caseType: law.law_type.value,
      caseReason: law.base_info,
      detail: law.detail_info,
      create_time: law.create_time,
      status_id: law.status_id,
      agency: law.agency_word === null ? null : {
        url: law.agency_word.url,
        filename: path.basename(law.agency_word.url),
        uploadTime: law.agency_word.create_time
      },
      host: {
        id: hostUserInfo.id,
        username: hostUserInfo.name,
        scale: law.host_assist_scale,
      },
      assiant: assistList
    }, '')
  }
}

module.exports = LawInfoService;
