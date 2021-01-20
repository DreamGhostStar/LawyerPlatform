'use strict';

const Service = require('egg').Service;

class LawListService extends Service {
  /**
   * @description 获取案件列表信息
   * @return {Array} 案件列表信息
   * @param {boolean} isAll
   * @param {string} status
   * @param {number} page
   * @memberof LawListService
   */
  async getLawList(isAll, status, page) {
    const { ctx, service } = this;
    const lawRedisList = await service.redis.getLawsInRedis();

    const lawList = [];
    lawRedisList.forEach(law => {
      const temp = {};
      temp.law_id = law.id;
      temp.name = law.name;
      temp.state = law.law_status.value;
      temp.base_info = law.base_info;
      temp.type = law.law_type.value;
      temp.agency_word = law.agency_word ? law.agency_word.url : null;
      temp.finish_file = law.finish_file ? law.finish_file.url : null;
      if (isAll) {
        lawList.push(temp);
      } else if (law.law_status.value === status) {
        lawList.push(temp);
      }
    });
    // 分页处理
    const res = lawList.slice((page - 1) * 20, page * 20)
    return ctx.retrunInfo(0, res, '');
  }

  /**
   * @description 管理员获取案件列表信息
   * @return {Array} 案件列表信息
   * @memberof LawListService
   */
  async adminGetLawList() {
    const { ctx, service } = this;
    const lawRedisList = await service.redis.getLawsInRedis();

    const lawList = []
    for (let i = 0; i < lawRedisList.length; i++) {
      const lawItem = lawRedisList[i];
      const hostInfo = await ctx.model.User.User.findOne({
        where: {
          id: lawItem.host_user_id
        }
      })
      lawList.push({
        id: lawItem.id,
        name: lawItem.name,
        type: await service.law.lawUtil.getLawType(lawItem.law_type.value),
        trial: await service.law.lawUtil.getLawAudit(lawItem.law_audit.value),
        host: hostInfo.name
      })
    }
    return ctx.retrunInfo(0, lawList, '');
  }
}

module.exports = LawListService;
