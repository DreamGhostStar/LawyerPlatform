'use strict';

const Service = require('egg').Service;

class ScheduleService extends Service {
  /**
   * @description 新建日程
   * @return {object} 返回信息
   * @memberof ScheduleService
   */
  async create() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const { title, content, warn_time } = query;
    const jwtData = await service.jwt.getJWtData();
    const userID = jwtData.userID;
    const res = await ctx.model.Schedule.Schedule.create({
      user_id: userID,
      title,
      content,
      warn_time,
      create_time: new Date().getTime(),
    });
    return res;
  }

  /**
   * @return {Array} 数据库表中的日程数据
   * @memberof ScheduleService
   */
  async getSchedulesInDataBase() {
    const { ctx } = this;
    const scheduleListInDataBase = await ctx.model.Schedule.Schedule.findAll({
      include: [
        {
          model: ctx.model.Schedule.ScheduleAlterTime,
        },
      ],
    });

    return scheduleListInDataBase;
  }

  /**
   * @description 获取日程列表信息
   * @return {object} 返回信息
   * @memberof LogService
   */
  async getSchedulesList() {
    const { ctx, service } = this;
    const query = ctx.query;
    const schedulesInRedis = await service.redis.getSchedulesInRedis();
    const res = [];
    const year = await service.util.transfromStringToNumber(query.year);
    const month = await service.util.transfromStringToNumber(query.month);
    const date = await service.util.transfromStringToNumber(query.day);

    schedulesInRedis.forEach(schedule => {
      const createTime = new Date(parseInt(schedule.create_time));
      const createYear = createTime.getFullYear();
      const createMonth = createTime.getMonth() + 1;
      const createDate = createTime.getDate();
      if (createYear === year &&
        createMonth === month &&
        createDate === date) {
        const temp = {
          schedule_id: schedule.id,
          content: schedule.content,
          create_time: schedule.create_time,
          warn_time: schedule.warn_time,
        };
        res.push(temp);
      }
    });
    return ctx.retrunInfo(0, res, '');
  }


  /**
   * @description 修改日程信息
   * @return {object} 返回信息
   * @memberof ScheduleService
   */
  async modify() {
    const { ctx } = this;
    const query = ctx.request.body;
    const { schedule_id, warn_time, content, title } = query;
    let transaction;

    try {
      transaction = await ctx.model.transaction();
      const schedule = await ctx.model.Schedule.Schedule.findByPk(schedule_id); // 查找指定的user数据
      await schedule.update({
        warn_time,
        content,
        title,
      }, {
        transaction,
      });

      await ctx.model.Schedule.ScheduleAlterTime.create({
        title,
        content,
        warn_time,
        schedule_id,
      }, {
        transaction,
      });
      await transaction.commit();
      return ctx.retrunInfo(0, '', '修改成功');
    } catch (error) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', error.message);
    }
  }

  /**
   * @description 通过日程ID获取日程内容
   * @param {number} ID 日程ID
   * @return {object} 日程内容
   * @memberof ScheduleService
   */
  async getScheduleByID(ID) {
    const { service } = this;
    const scheduleBlackListInRedis = await service.cache.get('scheduleBlackList') || [];
    const isExist = scheduleBlackListInRedis.indexOf(ID) === -1;

    if (!isExist) {
      return null;
    }
    const scheduleListInRedis = await service.redis.getSchedulesInRedis();
    let res;
    scheduleListInRedis.forEach(schedule => {
      if (schedule.id === ID) {
        res = schedule;
        return;
      }
    });

    return res;
  }

  /**
   * @description 软删除日程，在redis中存放日程黑名单
   * @return {object} 返回信息
   * @memberof ScheduleService
   */
  async delete() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const scheduleID = query.schedule_id;
    const res = await service.redis.reserveScheduleBlackListInRedis(scheduleID);
    return res;
  }
}

module.exports = ScheduleService;
