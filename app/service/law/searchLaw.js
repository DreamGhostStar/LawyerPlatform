'use strict';

const Service = require('egg').Service;

class SearchLawService extends Service {
  /**
   * @description 搜索案件
   * @param {string} title 案件标题
   * @return {object} 返回信息
   * @memberof SearchLawService
   */
  async search(title) {
    const { ctx, service } = this
    // 对案件的名称进行模糊查询
    const selectLawList = await ctx.model.Law.Law.findAll({
      include: [
      {
        model: ctx.model.Law.LawType,
      }, 
      {
        model: ctx.model.Law.LawAudit,
      },
    ],
      where: {
        name: { $like: `%${title}%` }
      }
    });
    const res = []
    for (let i = 0; i < selectLawList.length; i++) {
      const law = selectLawList[i];
      const host = await ctx.model.User.User.findByPk(law.host_user_id)
      res.push(
      {
        law_id: law.id, //案件id
        name: law.name, //案件名称
        type: await service.law.lawUtil.getLawType(law.law_type.value),
        audit: await service.law.lawUtil.getLawAudit(law.law_audit.value),
        host: {
          name: host.name, //名字
          phone: host.phone_number //电话
        }
      })
    }

    return ctx.retrunInfo(0, res, '查询成功')
  }
}

module.exports = SearchLawService;
