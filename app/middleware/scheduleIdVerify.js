'use strict';

module.exports = () => {
  return async function jwtErr(ctx, next) {
    const scheduleID = ctx.request.body.schedule_id;

    if (!scheduleID) {
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
      return;
    }

    const schedule = await ctx.service.schedule.getScheduleByID(parseInt(scheduleID));
    if (!schedule) {
      ctx.body = ctx.retrunInfo(-1, '', '日程不存在');
      return;
    }
    await next();
  };
};
