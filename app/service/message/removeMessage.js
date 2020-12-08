'use strict';

const Service = require('egg').Service;

class RemoveMessageService extends Service {
  /**
   * @description 删除消息
   * @param {number} informID
   * @return {object} 响应详情
   * @memberof RemoveMessageService
   */
  async removeMessage(informID) {
    const { ctx } = this
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      const diary = await ctx.model.User.Message.findByPk(informID);
      await diary.destroy({
        transaction,
      });
      await transaction.commit();
      return ctx.retrunInfo(0, '', '删除成功');
    } catch (err) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = RemoveMessageService;
