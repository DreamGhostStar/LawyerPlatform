'use strict';

const Service = require('egg').Service;

class GetPhoneService extends Service {
  /**
   * @description 获取单位和日常电话
   * @return {object} 返回信息
   * @memberof GetPhoneService
   */
  async getUnitAndPhone(id) {
    const { ctx } = this
    const unitList = await ctx.model.Office.Unit.findAll()
    // 单位需经过处理
    const resUnit = [];
    for (let i = 0; i < unitList.length; i++) {
      const unitItem = unitList[i];
      if(unitItem.unit_id === id){
        resUnit.push(unitItem)
      }
    }
    const phoneList = await ctx.model.Office.DailyPhone.findAll()
    // phone需经过处理
    const resPhone = [];
    for (let i = 0; i < phoneList.length; i++) {
      const phoneItem = phoneList[i];
      if(phoneItem.unit_id === id){
        resPhone.push(phoneItem)
      }
    }
    const resUnitList = resUnit.map(unitItem => {
      return {
        type: 'unit',
        id: unitItem.id,
        value: unitItem.name,
        address: unitItem.address || ''
      }
    })
    const resPhoneList = resPhone.map(unitItem => {
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
