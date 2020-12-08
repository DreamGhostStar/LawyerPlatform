'use strict';

const Service = require('egg').Service;

class AlterStatusService extends Service {
  /**
   * @description 获取对应通知ID的消息详情
   * @param {number} informID
   * @param {boolean} isWatched
   * @return {object} 通知详情
   * @memberof AlterStatusService
   */
  async alterStatus(informID, isWatched) {
    const { ctx } = this;
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      const message = await ctx.model.User.Message.findByPk(informID); // 查找指定的日志数据
      await message.update({
        is_watched: isWatched
      }, {
        transaction,
      });
      await transaction.commit();
      return ctx.retrunInfo(0, '', '修改消息状态成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AlterStatusService;
