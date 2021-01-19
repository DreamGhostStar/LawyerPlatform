'use strict';

const Service = require('egg').Service;

class GetUserSalaryListService extends Service {
  /**
   * @description 收入页面获取用户信息
   * @param {number} userID 用户ID
   * @return {object} 返回信息
   * @memberof GetUserInfoService
   */
  async getUserSalaryList(userID) {
    const { ctx, service } = this;
    const userLawList = await ctx.model.User.User.findOne({
      include: [
      {
        model: ctx.model.Law.Law
      }],
      where: {
        id: userID
      }
    })
    const res = [];
    const map = new Map(); // 年份为key，数组index为value
    const userTypeMap = {
      host: '主办人',
      assistant: '协办人'
    }
    userLawList.laws.map(userLawItem => {
      const lawYear = userLawItem.user_salary.year;
      if (map.has(lawYear)) {
        res[map.get(lawYear)].year_salary =
          (parseFloat(res[map.get(lawYear)].year_salary) + parseFloat(userLawItem.user_salary.value))
          .toString()
        res[map.get(lawYear)].case_list.push({
          case_name: userLawItem.name, //案件名
          identity: userTypeMap[userLawItem.user_salary.user_type], //主办人还是协办人
          generalSalary: parseFloat(userLawItem.user_salary.value) / parseFloat(userLawItem.user_salary.scale), //总律师费
          salary: parseFloat(userLawItem.user_salary.value), //该案件分得的律师费
          ratio: parseFloat(userLawItem.user_salary.scale), //该用户占该案件的金额比例
        })
      } else {
        map.set(lawYear, res.length)
        res[map.get(lawYear)] = {
          year: lawYear,
          year_salary: parseFloat(userLawItem.user_salary.value).toString(),
          case_list: [{
            case_name: userLawItem.name, //案件名
            identity: userTypeMap[userLawItem.user_salary.user_type], //主办人还是协办人
            generalSalary: parseFloat(userLawItem.user_salary.value) / parseFloat(userLawItem.user_salary.scale), //总律师费
            salary: parseFloat(userLawItem.user_salary.value), //该案件分得的律师费
            ratio: parseFloat(userLawItem.user_salary.scale), //该用户占该案件的金额比例
          }]
        }
      }
    })

    return ctx.retrunInfo(0, res, '获取成功')
  }
}

module.exports = GetUserSalaryListService;
