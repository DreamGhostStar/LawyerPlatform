'use strict';

const Service = require('egg').Service;

class SalaryService extends Service {
  /**
   * @description 查询当前用户的收入列表
   * @return {Array} 收入数组
   * @memberof SalaryService
   */
  async getSalaryList() {
    const { service, ctx } = this;
    const jwtData = await service.jwt.getJWtData();
    let salaryList = [];

    const typeContrast = { // 用户类型字典
      host: '主办人',
      assistant: '协办人',
    };

    const userHostList = await ctx.model.User.User.findOne({
      include: [
        {
          model: ctx.model.Law.Law,
          attributes: [ 'id', 'money', 'host_assist_scale' ],
        },
      ],
      where: {
        id: jwtData.userID,
      },
      attributes: [ 'id' ],
    });

    userHostList.laws.forEach(law => {
      salaryList.push({
        case_id: law.id,
        identity: typeContrast[law.user_salary.user_type],
        generalSalary: law.money,
        salary: law.user_salary.value,
        ratio: law.user_salary.scale,
      });
    });

    salaryList = await this.sortSalaryList(salaryList);

    return salaryList;
  }

  /**
   * @description 将收入数组进行排序
   * @param {Array} salaryList 收入数组
   * @return {Array} 排序后的收入数组
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
