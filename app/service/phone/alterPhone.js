'use strict';

const Service = require('egg').Service;

class AlterPhoneService extends Service {
  /**
   * @description 修改日常电话
   * @return {object} 返回信息
   * @memberof AlterPhoneService
   */
  async aletrPhone(id, value, phoneNumber) {
    const { ctx } = this;
    let transaction;
    transaction = await ctx.model.transaction(); // 定义事务
    try {
      const phone = await ctx.model.Office.DailyPhone.findOne({
        where: {
          id
        }
      })
      if (!phone) {
        throw new Error('未找到该日常电话')
      }
      await phone.update({
        name: value,
        phone_number: phoneNumber
      }, { transaction })
      await transaction.commit();
      return ctx.retrunInfo(0, '', '修改日常电话成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }

  /**
   * @description 修改单位
   * @return {object} 返回信息
   * @memberof AlterPhoneService
   */
  async aletrUnit(id, value, address) {
    const { ctx } = this;
    let transaction;
    transaction = await ctx.model.transaction(); // 定义事务
    try {
      const unit = await ctx.model.Office.Unit.findOne({
        where: {
          id
        }
      })
      if (!unit) {
        throw new Error('未找到该单位')
      }
      await unit.update({
        name: value,
        address
      }, { transaction })
      await transaction.commit();
      return ctx.retrunInfo(0, '', '修改单位成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AlterPhoneService;
