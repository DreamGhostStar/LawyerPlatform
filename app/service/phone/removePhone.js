'use strict';

const Service = require('egg').Service;

class RemovePhoneService extends Service {
  /**
   * @description 删除日常电话
   * @return {object} 返回信息
   * @memberof RemovePhoneService
   */
  async removePhone(id) {
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
        throw new Error('未找到该电话号码')
      }
      await phone.destroy({ transaction })
      await transaction.commit();
      return ctx.retrunInfo(0, '', '删除日常电话成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }

  /**
   * @description 删除单位
   * @return {object} 返回信息
   * @memberof RemovePhoneService
   */
  async removeUnit(id) {
    const { ctx } = this;
    let transaction;
    transaction = await ctx.model.transaction(); // 定义事务
    try {
      const unitList = await ctx.model.Office.Unit.findAll({
        where: {
          unit_id: id
        }
      })
      if (unitList.length !== 0) {
        throw new Error('删除的单位不能包含单位')
      }

      const unit = await ctx.model.Office.Unit.findOne({
        where: {
          id
        }
      })
      const phoneList = await ctx.model.Office.DailyPhone.findAll({
        where: {
          unit_id: id
        }
      })
      phoneList.forEach(phone => {
        phone.destroy({ transaction })
      })
      await unit.destroy({ transaction })
      await transaction.commit();
      return ctx.retrunInfo(0, unitList, '删除单位成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = RemovePhoneService;
