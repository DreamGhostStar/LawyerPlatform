'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const verifyPhoneNumber = middleware.verifyPhoneNumber(); // 验证手机号的中间件
  const imageVerifyCode = middleware.imageVerifyCode(); // 验证图片验证码正确性的中间件
  const noteVerifyCode = middleware.noteVerifyCode(); // 验证短信验证码正确性的中间件
  const lawIdVerify = middleware.lawIdVerify(); // 验证案件ID是否传输正确的中间件
  const logIdVerify = middleware.logIdVerify(); // 验证日志ID是否传输正确的中间件
  const scheduleIdVerify = middleware.scheduleIdVerify(); // 验证日志ID是否传输正确的中间件

  // 登录相关
  router.post('/api/login/password', imageVerifyCode, verifyPhoneNumber, controller.user.loginInPassword);
  router.post('/api/login/note', noteVerifyCode, verifyPhoneNumber, verifyPhoneNumber, controller.user.loginInNote);

  // 用户相关
  router.get('/api/user/getInfo', controller.user.getUserInfo);
  router.post('/api/user/alterPassword', controller.user.modifyPassword);
  router.post('/api/user/reserveAvatarUrl', controller.user.modifyAvatar);
  router.post('/api/user/exit', controller.user.exit);

  // 金额相关
  router.get('/api/user/salaryList', controller.salary.salaryList);

  // 验证码相关
  router.get('/api/public/verificationCode/image', controller.home.getImageVeriyCode);
  router.post('/api/public/verificationCode/note', verifyPhoneNumber, controller.home.getNoteVerifyCode);

  // 文件相关
  router.post('/api/public/upload', controller.home.uploadFiles);
  router.post('/api/case/reserveFileUrl', lawIdVerify, controller.home.reserveFileUrl);
  router.get('/api/public/download', lawIdVerify, controller.law.downloadWordUrl);

  // 案件相关
  router.get('/api/case/getList', controller.law.getLawList);
  router.put('/api/case', lawIdVerify, controller.law.alterLaw);
  router.put('/api/admin/case', lawIdVerify, controller.law.addLaw);

  // 日志相关
  router.post('/api/log/new', controller.log.create);
  router.get('/api/log/getList', controller.log.getLogsList);
  router.post('/api/user/log/modify', logIdVerify, controller.log.modify);
  router.post('/api/log/delete', logIdVerify, controller.log.delete);
  router.get('/api/log/caselog', controller.log.getLogsByLawID);

  // 日程相关
  router.post('/api/schedule/new', controller.schedule.create);
  router.get('/api/schedule/getList', controller.schedule.getScheduleList);
  router.post('/api/schedule/modify', scheduleIdVerify, controller.schedule.modify);
  router.post('/api/schedule/delete', scheduleIdVerify, controller.schedule.delete);
};
