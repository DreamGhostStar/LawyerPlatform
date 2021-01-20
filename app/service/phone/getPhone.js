'use strict';

const Service = require('egg').Service;

class GetPhoneService extends Service {
  /**
   * @description 获取单位和日常电话
   * @return {object} 返回信息
   * @memberof GetPhoneService
   */
  async getUnitAndPhone(id) {
    const { ctx, service } = this
    const unitList = await ctx.model.Office.Unit.findAll({
      where: {
        id
      }
    })
    const phoneList = await ctx.model.Office.DailyPhone.findAll({
      where: {
        unit_id: id
      }
    })
    const resUnitList = unitList.map(unitItem => {
      return {
        type: 'unit',
        id: unitItem.id,
        value: unitItem.name,
        address: unitItem.address || ''
      }
    })
    const resPhoneList = phoneList.map(unitItem => {
      return {
        type: 'phone',
        id: unitItem.id,
        value: unitItem.name,
        phoneNumber: unitItem.phone_number || ''
      }
    })
    return ctx.retrunInfo(0, [...resUnitList, ...resPhoneList], '获取成功')
  }
}

module.exports = GetPhoneService;
