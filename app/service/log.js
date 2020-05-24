'use strict';

const Service = require('egg').Service;

class LogService extends Service {
  /**
   * @description 新建日志
   * @return {object} 返回信息
   * @memberof LogService
   */
  async create() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const jwtData = await service.jwt.getJWtData();
    const userID = jwtData.userID;
    try {
      const { title, content, select_time, is_alter, lawyer_id } = query;
      const nowDate = new Date();
      await ctx.model.Log.Log.create({
        title,
        content,
        lawyer_id: lawyer_id || null,
        select_time,
        create_user_id: userID,
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
        log_type_id: 1,
        is_alter,
      });
      return ctx.retrunInfo(0, '', '新建日志成功');
    } catch (error) {
      return ctx.retrunInfo(-1, '', error.message);
    }
  }

  /**
   * @return {Array} 数据库表中的日志数据
   * @memberof LogService
   */
  async getLogsInDataBase() {
    const { ctx } = this;
    const logListInDataBase = await ctx.model.Log.Log.findAll({
      include: [
        {
          model: ctx.model.Log.LogAlterTime,
        },
        {
          model: ctx.model.Log.LogType,
        },
      ],
    });

    return logListInDataBase;
  }

  /**
   * @description 获取日志列表信息
   * @return {object} 返回信息
   * @memberof LogService
   */
  async getLogsList() {
    const { ctx, service } = this;
    const query = ctx.query;
    const logsInRedis = await service.redis.getLogsInRedis();
    const res = [];
    const isAlter = await service.util.transfromStringToBool(query.is_alter);
    const year = await service.util.transfromStringToNumber(query.year);
    const month = await service.util.transfromStringToNumber(query.month);
    const date = await service.util.transfromStringToNumber(query.date);

    logsInRedis.forEach(log => {
      if (log.year === year &&
        log.month === month &&
        log.date === date &&
        log.is_alter === isAlter) {
        const temp = {
          log_id: log.id,
          title: log.title,
          content: log.content,
          create_time: log.create_time,
          type: log.log_type.value,
          is_alter: log.is_alter,
          select_time: log.select_time,
        };
        res.push(temp);
      }
    });
    return ctx.retrunInfo(0, res, '');
  }

  /**
   * @description 修改日志信息
   * @return {object} 返回信息
   * @memberof LogService
   */
  async modifyLogInfo() {
    const { ctx } = this;
    const query = ctx.request.body;
    const { log_id, select_time, modify_content, title } = query;
    let transaction;

    try {
      transaction = await ctx.model.transaction();
      const log = await ctx.model.Log.Log.findByPk(log_id); // 查找指定的user数据
      await log.update({
        select_time,
        title,
        content: modify_content,
      }, {
        transaction,
      });

      await ctx.model.Log.LogAlterTime.create({
        title,
        content: modify_content,
        select_time,
        log_id,
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
   * @description 通过日志ID获取日志内容
   * @param {number} ID 日志ID
   * @return {object} 日志内容
   * @memberof LogService
   */
  async getLogByID(ID) {
    const { service } = this;
    const logBlackListInRedis = await service.cache.get('logBlackList') || [];
    const isExist = logBlackListInRedis.indexOf(ID) === -1;

    if (!isExist) {
      return null;
    }
    const logListInRedis = await service.redis.getLogsInRedis();
    let res = {};
    logListInRedis.forEach(log => {
      if (log.id === ID) {
        res = log;
        return;
      }
    });

    return res;
  }

  /**
   * @description 软删除日志，在redis中存放日志黑名单
   * @return {object} 返回信息
   * @memberof LogService
   */
  async deleteLog() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const logID = query.log_id;
    const res = await service.redis.reserveLogBlackListInRedis(logID);
    return res;
  }
}

module.exports = LogService;
