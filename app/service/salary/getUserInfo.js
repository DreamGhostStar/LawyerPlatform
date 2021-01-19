'use strict';

const Service = require('egg').Service;

class GetUserInfoService extends Service {
  /**
   * @description 收入页面获取用户信息
   * @param {number} userID 用户ID
   * @return {object} 返回信息
   * @memberof GetUserInfoService
   */
  async getUserInfo(userID) {
    const { ctx, service } = this;
    const userListInRedis = await service.redis.getUserInRedis();
    let userInfo = null;
    userListInRedis.map(userItem => {
      if (userItem.id === userID) {
        userInfo = {
            avatar: userItem.avatar,
            name: userItem.name,
            phoneNumber: userItem.phone_number,
            weixin_number: userItem.weixin_number,
            lawyer_number: userItem.lawyer_number
        }
      }
    })

    if(!userInfo){
        return ctx.retrunInfo(-1, '', '用户不存在')
    }

    const userSalaryList = await ctx.model.User.User.findOne({
        include: [
            {
                model: ctx.model.User.UserSalary
            }
        ],
        where: {
            id: userID
        }
    })
    let allSalaryNum = 0;
    userSalaryList.user_salaries.map(salaryItem=>{
        allSalaryNum += parseFloat(salaryItem.value)
    })
    userInfo.salaryNum = allSalaryNum.toString();

    return ctx.retrunInfo(0, userInfo, '获取成功')
  }
}

module.exports = GetUserInfoService;
