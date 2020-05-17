'use strict';

const Service = require('egg').Service;

class SalaryService extends Service {
  // TODO:在数据库中建立相关表，通过案件表作为基准查询收入
  async getSalaryList() {
    const { ctx, service } = this;
    const jwtData = await service.common.getJWtData();

    const userData = await ctx.model.User.User.findOne({
      include: [
        {
          model: ctx.model.User.Jurisdiction,
        },
        {
          model: ctx.model.User.LawyerOffice,
        },
        {
          model: ctx.model.Law.Law,
        },
      ],
      where: {
        id: jwtData.userID,
      },
    });
    return userData;
  }
}

module.exports = SalaryService;
