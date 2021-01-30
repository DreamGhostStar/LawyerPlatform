'use strict';

const Service = require('egg').Service;

class GetUnitService extends Service {
  /**
   * @description 获取单位
   * @return {object} 返回信息
   * @memberof GetUnitService
   */
  async getUnit() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();
    const userID = jwtData.userID

    const userInfo = await ctx.model.User.User.findOne({
      include: [
      {
        model: ctx.model.User.LawyerOffice
      }],
      where: {
        id: userID
      }
    })

    const unitList = await ctx.model.Office.Unit.findAll();
    const resList = unitList.map(unit => {
      return {
        unit_id: unit.id, //单位id
        unit_name: unit.name, //单位名称
        unit_address: unit.address, //单位地址
      }
    })

    return ctx.retrunInfo(0, [{
      name: userInfo.lawyer_office.lawyer_office_name,
      unit: resList
    }], '获取成功')
  }
}

module.exports = GetUnitService;
