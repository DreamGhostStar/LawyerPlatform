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
    for (let i = 0; i < lawRedisList.length; i++) {
      const law = lawRedisList[i];
      const hostInfo = await ctx.model.User.User.findOne({
        where: {
          id: law.host_user_id
        }
      })
      const temp = {
        law_id: law.id,
        name: law.name,
        type: await service.law.lawUtil.getLawType(law.law_type.value),
        audit: await service.law.lawUtil.getLawAudit(law.law_audit.value),
        host: {
          name: hostInfo.name,
          phone: hostInfo.phone_number
        }
      };
      if (isAll) {
        lawList.push(temp);
      } else if (law.law_status.value === status) {
        lawList.push(temp);
      }
    }
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
    const userRedisList = await service.redis.getUserInRedis();

    const lawList = []
    for (let i = 0; i < lawRedisList.length; i++) {
      const lawItem = lawRedisList[i];
      let hostName = '';
      for (let j = 0; j < userRedisList.length; j++) {
        const userItem = userRedisList[j];
        if (userItem.id === lawItem.host_user_id) {
          hostName = userItem.name
          break;
        }
      }
      lawList.push({
        id: lawItem.id,
        name: lawItem.name,
        type: await service.law.lawUtil.getLawType(lawItem.law_type.value),
        trial: await service.law.lawUtil.getLawAudit(lawItem.law_audit.value),
        host: hostName
      })
    }
    return ctx.retrunInfo(0, lawList, '');
  }
}

module.exports = LawListService;
