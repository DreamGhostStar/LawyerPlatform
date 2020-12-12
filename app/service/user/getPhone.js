'use strict';

const Service = require('egg').Service;

class GetPhoneService extends Service {
  /**
   * @description 获取单位所属的联系人列表
   * @param {number} unitID 单位ID
   * @return {object} 返回信息
   * @memberof GetPhoneService
   */
  async getPhoneList(unitID) {
    const { ctx } = this
    const unitInfo = await ctx.model.Office.Unit.findOne({
      where: {
        id: unitID
      }
    })
    const phoneList = await ctx.model.Office.DailyPhone.findAll({
      where: {
        unit_id: unitID
      }
    })
    const resPhoneList = phoneList.map(phone => {
      return {
        lawyer_name: phone.name, //负责人名字
        lawyer_phone: phone.phone_number //负责人电话
      }
    })

    return ctx.retrunInfo(0, {
      name: unitInfo.name,
      lawyer_list: resPhoneList
    })
  }
}

module.exports = GetPhoneService;
