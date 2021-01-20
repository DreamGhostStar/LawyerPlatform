'use strict';

const Service = require('egg').Service;

class AddPhoneService extends Service {
  /**
   * @description 增加日常电话
   * @return {object} 返回信息
   * @memberof AddPhoneService
   */
  async addPhone(unitID, value, phone_number) {
    const { ctx } = this;
    let transaction;
    transaction = await ctx.model.transaction(); // 定义事务
    try {
      await ctx.model.Office.DailyPhone.create({
        lawyer_office_id: 1,
        unit_id: unitID,
        name: value,
        phone_number
      }, {
        transaction
      })
      await transaction.commit();
      return ctx.retrunInfo(0, '', '增加日常电话成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }

  /**
   * @description 增加单位
   * @return {object} 返回信息
   * @memberof AddPhoneService
   */
  async addUnit(unitID, value, address) {
    const { ctx } = this;
    let transaction;
    transaction = await ctx.model.transaction(); // 定义事务
    try {
      await ctx.model.Office.Unit.create({
        lawyer_office_id: 1,
        unit_id: unitID,
        name: value,
        address
      }, {
        transaction
      })
      await transaction.commit();
      return ctx.retrunInfo(0, '', '增加单位成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AddPhoneService;
