'use strict';

const Service = require('egg').Service;

class GetDetailService extends Service {
  /**
   * @description 获取对应通知ID的消息详情
   * @param {number} informID
   * @return {object} 通知详情
   * @memberof GetDetailService
   */
  async getMessageDetail(informID) {
    const { ctx, service } = this
    // 获取消息详情
    const messageDetail = await ctx.model.User.Message.findOne({
      include: [
      {
        model: ctx.model.Law.Law
      },
      {
        model: ctx.model.User.User
      }, 
    ],
      where: {
        id: informID
      }
    })
    // 获取数据库中所有用户
    const userList = await service.user.userUtil.getUsersInDataBase();
    let hostName; // 主办人姓名
    let guestList = [] // 协办人姓名数组
    let checkerName; // 审核人姓名
    // 获取消息所涉案件的具体信息
    const lawDetail = await ctx.model.Law.Law.findOne({
      include: [
      {
        model: ctx.model.User.User
      }],
      where: {
        id: messageDetail.law.id
      }
    })
    // 遍历案件具体信息中的协办人从而增加协办人姓名
    lawDetail.users.forEach(assistantUser => {
      guestList.push(assistantUser.name)
    })
    // 遍历数据库中所有用户以找到主办人姓名和审核人姓名
    userList.forEach(user => {
      if (user.id === messageDetail.form_user_id) {
        checkerName = user.name;
      } else if (user.id === messageDetail.law.host_user_id) {
        hostName = user.name
      }
    })

    return ctx.retrunInfo(0, {
      caseID: messageDetail.law.number, //案件号
      host: hostName, // 主办人
      guest: guestList, //协办人列表
      agree: messageDetail.is_agree, //是否同意
      checker: checkerName, //审核人
      comment: messageDetail.remark, //备注
    }, '获取成功')
  }
}

module.exports = GetDetailService;
