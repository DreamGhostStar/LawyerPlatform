'use strict';

const Service = require('egg').Service;

class SalaryService extends Service {
  /**
   * @description 查询当前用户的收入列表
   * @return {object[]} 收入数组
   * @memberof SalaryService
   */
  async getSalaryList() {
    const { service, ctx } = this;
    const jwtData = await service.jwt.getJWtData();
    const isAll = await service.util.transfromStringToBool(ctx.request.query.isAll);
    const year = parseInt(ctx.request.query.year);

    if (typeof isAll === 'undefined') { // 如果未传isAll参数，则请求参数错误
      return ctx.retrunInfo(-1, '', '请求参数错误');
    }

    if (!isAll && typeof year === 'undefined') {
      return ctx.retrunInfo(-1, '', '缺少year参数');
    }

    const typeContrast = { // 用户类型字典
      host: '主办人',
      assistant: '协办人',
    };

    const userHostList = await ctx.model.User.User.findOne({
      include: [
      {
        model: ctx.model.Law.Law,
        attributes: ['id', 'money', 'host_assist_scale'],
      }, ],
      where: {
        id: jwtData.userID,
      },
      attributes: ['id'],
    });

    const salaryMap = new Map();
    userHostList.laws.forEach(law => {
      const item = {
        case_id: law.id,
        identity: typeContrast[law.user_salary.user_type],
        generalSalary: law.money,
        salary: law.user_salary.value,
        ratio: law.user_salary.scale,
      };
      if (isAll) {
        if (salaryMap.has(law.user_salary.year)) {
          salaryMap.set(law.user_salary.year, [...salaryMap.get(law.user_salary.year), item])
        } else {
          salaryMap.set(law.user_salary.year, [item])
        }
      } else {
        if (year === law.user_salary.year) {
          if (salaryMap.has(law.user_salary.year)) {
            salaryMap.set(law.user_salary.year, [...salaryMap.get(law.user_salary.year), item])
          } else {
            salaryMap.set(law.user_salary.year, [item])
          }
        }
      }
    });

    const res = [];
    for (let key of salaryMap.keys()) {
      let sum = 0; // 每年的总收入
      for (let i = 0; i < salaryMap.get(key).length; i++) {
        sum += parseFloat(salaryMap.get(key)[i].salary)
      }
      res.push({
        year: key,
        year_salary: sum,
        case_list: await service.salary.sortSalaryList(salaryMap.get(key))
      })
    }

    return ctx.retrunInfo(0, res, '');
  }

  /**
   * @description 将收入数组进行排序
   * @param {object[]} salaryList 收入数组
   * @return {object[]} 排序后的收入数组
   * @memberof SalaryService
   */
  async sortSalaryList(salaryList) {
    const compare = (obj1, obj2) => {
      const val1 = obj1.case_id;
      const val2 = obj2.case_id;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      }

      return 0;
    };
    return salaryList.sort(compare);
  }
}

module.exports = SalaryService;
