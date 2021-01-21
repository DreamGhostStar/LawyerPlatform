'use strict';

const Service = require('egg').Service;

class AlterLawService extends Service {
  /**
   * @description 修改案件信息
   * @return {object} 返回信息
   * @memberof AlterLawService
   */
  async alterLaw() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const { id, accuser, defendant, trial_level, classifcation, details, host_id, guests, scale } = query;
    const jwtData = await service.jwt.getJWtData();
    const userID = jwtData.userID;

    if (typeof id !== 'number') {
      return ctx.retrunInfo(-1, '', 'id请求类型错误');
    }
    let transaction;

    try {
      // 通过用户ID获取律师事务所的金额比例
      const user = await ctx.model.User.User.findOne({
        include: [
        {
          model: ctx.model.User.LawyerOffice,
        }, ],
        where: {
          id: userID,
        },
      });
      const lawyer_office_scale = parseFloat(user.lawyer_office.lawyer_office_scale);

      // 计算出总的金额比例
      let allScale = lawyer_office_scale;
      guests.forEach(guest => {
        allScale += parseFloat(guest.scale);
      });
      allScale += parseFloat(scale);
      const isEuqelOne = await service.util.numbersCloseEnoughToEqual(1, allScale);

      // 如果金额比例相加不等于1的话，就返回错误
      if (!isEuqelOne) {
        return ctx.retrunInfo(-1, '', '总的金额比例不等于100%');
      }
      transaction = await ctx.model.transaction(); // 定义事务

      // 通过审级获取对应审级ID
      const lawAudit = await ctx.model.Law.LawAudit.findOne({
        where: {
          value: trial_level,
        },
      });
      if (!lawAudit) {
        throw new Error('审级不存在');
      }
      const law_audit_id = lawAudit.id;

      // 通过类别获取对应类别ID
      const lawType = await ctx.model.Law.LawType.findOne({
        where: {
          value: classifcation,
        },
      });
      if (!lawAudit) {
        throw new Error('类别不存在');
      }
      const law_type_id = lawType.id;

      const law = await ctx.model.Law.Law.findByPk(id); // 查找指定的案件数据
      const money = parseFloat(law.money); // 获取案件的金额总数
      const lawCreateTime = new Date(parseInt(law.create_time)); // 获取案件创建时间
      await law.update({
        accuser,
        defendant,
        base_info: details,
        host_user_id: host_id,
        host_assist_scale: scale,
        trial_level_id: law_audit_id,
        type_id: law_type_id,
      }, {
        transaction,
      });

      // 删除所有案件协办人表中关于该案件ID的数据
      const lawAssistantList = await ctx.model.Law.LawAssistant.findAll({
        where: {
          law_id: id,
        },
      });
      lawAssistantList.forEach(lawAssistant => {
        lawAssistant.destroy({ transaction });
      });

      // 删除所有用户金额表中所有关于该案件ID的数据（包括用户类别为协办和主办的）
      const userSalaryList = await ctx.model.User.UserSalary.findAll({
        where: {
          law_id: id,
        },
      });
      userSalaryList.forEach(userSalary => {
        userSalary.destroy({ transaction });
      });

      // 遍历前端传给后端的协办人数组，增加协办人表和用户金额表中的数据
      for (let index = 0; index < guests.length; index++) {
        const guest = guests[index];
        await ctx.model.Law.LawAssistant.create({
          law_id: id,
          assist_id: guest.user_id,
          scale: guest.scale,
        }, {
          transaction,
        });

        await ctx.model.User.UserSalary.create({
          value: money * guest.scale,
          user_id: guest.user_id,
          user_type: 'assistant',
          year: lawCreateTime.getFullYear(),
          law_id: id,
          is_pay: false,
          scale: guest.scale,
        }, {
          transaction,
        });
      }

      await ctx.model.User.UserSalary.create({
        value: money * scale,
        user_id: userID,
        user_type: 'host',
        year: lawCreateTime.getFullYear(),
        law_id: id,
        is_pay: false,
        scale,
      }, {
        transaction,
      });

      const logResult = await service.log.create('案件信息被修改', null, null, false, id, transaction);
      if (logResult.code !== 0) {
        throw new Error(logResult.message);
      }

      await transaction.commit();
      // 更新缓存中的案件、日志、用户数据
      await service.redis.updateLawsInRedis();
      await service.redis.updateLogsInRedis();
      await service.redis.updateUserInRedis();
      return ctx.retrunInfo(0, '', '修改成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }
}

module.exports = AlterLawService;
