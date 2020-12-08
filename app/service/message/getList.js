'use strict';

const Service = require('egg').Service;

class GetListService extends Service {
  /**
   * @description 查询当前用户的通知列表
   * @param {number} userID
   * @return {object[]} 通知列表
   * @memberof GetListService
   */
  async getMessageList(userID) {
    const { ctx } = this
    const messageList = await ctx.model.User.Message.findAll({
      include: [
      {
        model: ctx.model.Law.Law
      },
      {
        model: ctx.model.User.User
      }, 
    ],
      where: {
        to_user_id: userID
      }
    })
    const res = messageList.map(message => {
      return {
        name: message.law.name, //案件名称
        inform_id: message.id, //通知id
        is_agree: message.is_agree, //是否同意结案
        is_watched: message.is_watched, //用户是否已经查看该通知
      }
    })

    return ctx.retrunInfo(0, res, '获取成功')
  }
}

module.exports = GetListService;
